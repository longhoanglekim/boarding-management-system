package com.uet.longhoanglekim.authservice.service.impl;

import com.uet.longhoanglekim.authservice.message.RegisterMessage;
import com.uet.longhoanglekim.authservice.repository.UserRepository;
import com.uet.longhoanglekim.authservice.constant.ErrorCode;
import com.uet.longhoanglekim.authservice.constant.Provider;
import com.uet.longhoanglekim.authservice.dto.*;
import com.uet.longhoanglekim.authservice.exception.BusinessException;
import com.uet.longhoanglekim.authservice.model.User;
import com.uet.longhoanglekim.authservice.service.AuthService;
import com.uet.longhoanglekim.authservice.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RestTemplate restTemplate;
    private final KafkaTemplate<String, RegisterMessage> registerKafkaTemplate;
    @Override
    public RegisterResponse signup( RegisterInput input) {
        Optional<User> existingOpt = userRepository.findByEmail(input.getEmail());

        if (existingOpt.isPresent()) {
            User existUser = existingOpt.get();

            // Nếu user này đăng ký bằng LOCAL
            if (existUser.getProvider() == Provider.LOCAL) {
                if (!existUser.isActive()) {
                    // Người dùng chưa xác thực email
                    throw new BusinessException(ErrorCode.AUTH_NOT_VERIFIED);
                } else {
                    // Email đã tồn tại và đã active
                    throw new BusinessException(ErrorCode.AUTH_EMAIL_EXISTS);
                }
            }
        }
        String encodedPassword = passwordEncoder.encode(input.getPassword());
        User newUser = new User();
        newUser.setEmail(input.getEmail());
        newUser.setPassword(encodedPassword);
        newUser.setProvider(Provider.LOCAL);
        newUser.setActive(false);
        newUser.setUsername(input.getUsername());
        userRepository.save(newUser);

        RegisterResponse response = new RegisterResponse();
        response.setEmail(newUser.getEmail());
        response.setUsername(newUser.getUsername());
        response.setProvider(Provider.LOCAL);
        RegisterMessage registerMessage = new RegisterMessage(newUser.getEmail(), newUser.getId());
        registerKafkaTemplate.send("user_registered", registerMessage);

        return response;
    }

    @Override
    public LoginResponse login(LoginInput input) {
        User user = userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new BusinessException(ErrorCode.AUTH_USER_NOT_FOUND));


        if (!user.isActive()) {
            throw new BusinessException(ErrorCode.AUTH_NOT_VERIFIED);
        }

        if (!passwordEncoder.matches(input.getPassword(), user.getPassword())) {
            throw new BusinessException(ErrorCode.AUTH_INVALID_PASSWORD);
        }

        String accessToken = jwtService.generateToken(user);
        String refreshToken = UUID.randomUUID().toString();
        return LoginResponse.builder()
                .accessToken("Bearer " + accessToken)
                .refreshToken(refreshToken)
                .build();
    }


    @Override
    public LoginResponse loginWithOauth(OAuthRequest request) {
        String email;
        String providerUserId;

        switch (request.getProvider()) {
            case GMAIL -> {
                // Verify token với Google API
                String googleUrl = "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + request.getAccessToken();
                GoogleUserInfo googleUser = restTemplate.getForObject(googleUrl, GoogleUserInfo.class);
                if (googleUser == null || googleUser.getEmail() == null) {
                    throw new BusinessException(ErrorCode.AUTH_OAUTH_INVALID_TOKEN);
                }
                email = googleUser.getEmail();
                providerUserId = googleUser.getSub();
            }
            default -> throw new BusinessException(ErrorCode.AUTH_PROVIDER_NOT_SUPPORTED);
        }

        Optional<User> existingUser = userRepository.findByProviderAndProviderUserId(
                request.getProvider(),
                providerUserId
        );

        User user = existingUser.orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setProvider(request.getProvider());
            newUser.setProviderUserId(providerUserId);
            newUser.setActive(true);
            return userRepository.save(newUser);
        });

        return LoginResponse.builder()
                .accessToken(jwtService.generateToken(user))
                .refreshToken(UUID.randomUUID().toString())
                .build();
    }

    @Override
    public boolean verifyEmail(long id) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setActive(true);
            return true;
        }
        throw new BusinessException(ErrorCode.AUTH_USER_NOT_FOUND);
    }
}

package com.uet.longhoanglekim.userservice.service.impl;

import com.uet.longhoanglekim.userservice.dto.ProfileInfoDTO;
import com.uet.longhoanglekim.userservice.exception.BusinessException;
import com.uet.longhoanglekim.userservice.message.CreateProfileMessage;
import com.uet.longhoanglekim.userservice.model.UserProfile;
import com.uet.longhoanglekim.userservice.repository.UserRepository;
import com.uet.longhoanglekim.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    @Override
    public boolean createUserProfile(CreateProfileMessage createProfileMessage) {
        log.info("Create profile message: {}", createProfileMessage);
        UserProfile userProfile = new UserProfile();
        userProfile.setUserId(createProfileMessage.getUserId());
        userProfile.setCreatedAt(LocalDateTime.now());
        userProfile.setFullName(createProfileMessage.getFullName());

        try {
            userRepository.save(userProfile);
            return true;
        } catch (BusinessException e) {
            return false;
        }
    }

    @Override
    public boolean updateUserProfile(ProfileInfoDTO profileInfoDTO) {
        Optional<UserProfile> userProfileOpt = userRepository.findById(profileInfoDTO.getId());
        if (userProfileOpt.isPresent()) {
            UserProfile userProfile = userProfileOpt.get();
            userProfile.setFullName(profileInfoDTO.getFullName());
            userProfile.setDateOfBirth(profileInfoDTO.getDateOfBirth());
            userProfile.setGender(profileInfoDTO.getGender());
            userProfile.setDateOfBirth(profileInfoDTO.getDateOfBirth());
            try {
                userRepository.save(userProfile);
            } catch (BusinessException e) {
                return false;
            }
        }
        return true;
    }
}

package com.uet.longhoanglekim.authservice.controller;

import com.uet.longhoanglekim.authservice.config.ApiResponse;
import com.uet.longhoanglekim.authservice.dto.LoginInput;
import com.uet.longhoanglekim.authservice.dto.OAuthRequest;
import com.uet.longhoanglekim.authservice.dto.RegisterInput;
import com.uet.longhoanglekim.authservice.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthService authService;
    @PostMapping("/register")
    public ApiResponse<?> registerUser(@Valid @RequestBody RegisterInput registerInput) {
        return ApiResponse.success(authService.signup(registerInput), "Đăng ký thành công");
    }

    @PostMapping("/login")
    public ApiResponse<?> loginUser(@RequestBody LoginInput loginInput) {
        return ApiResponse.success(authService.login(loginInput), "Đăng nhập thành công");
    }

    @PostMapping("/login-with-oauth2")
    public ApiResponse<?> loginWithOauth2(@RequestBody OAuthRequest oAuthRequest) {
        return ApiResponse.success(authService.loginWithOauth(oAuthRequest), "Đăng nhập qua oauth2 thành công");
    }

    @PatchMapping("/verify-email/{id}")
    public ApiResponse<?> verifyEmail(@PathVariable long id) {
        return ApiResponse.success(authService.verifyEmail(id), "Đăng nhập thành công");
    }
}

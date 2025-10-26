package com.uet.longhoanglekim.authservice.controller;

import com.uet.longhoanglekim.authservice.config.ApiResponse;
import com.uet.longhoanglekim.authservice.dto.LoginInput;
import com.uet.longhoanglekim.authservice.dto.OAuthRequest;
import com.uet.longhoanglekim.authservice.dto.RegisterInput;
import com.uet.longhoanglekim.authservice.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthService authService;
    @ResponseBody
    @PostMapping("/register")
    public ApiResponse<?> registerUser(@Valid @RequestBody RegisterInput registerInput) {
        return ApiResponse.success(authService.signup(registerInput), "Đăng ký thành công");
    }
    @ResponseBody
    @PostMapping("/login")
    public ApiResponse<?> loginUser(@RequestBody LoginInput loginInput) {
        return ApiResponse.success(authService.login(loginInput), "Đăng nhập thành công");
    }
    @ResponseBody
    @PostMapping("/login-with-oauth2")
    public ApiResponse<?> loginWithOauth2(@RequestBody OAuthRequest oAuthRequest) {
        return ApiResponse.success(authService.loginWithOauth(oAuthRequest), "Đăng nhập qua oauth2 thành công");
    }
    @ResponseBody
    @PostMapping("/verify-email/{id}")
    public ApiResponse<?> verifyEmail(@PathVariable long id) {
        return ApiResponse.success(authService.verifyEmail(id), "Xác thực email thành công");
    }

    @GetMapping("/verify-email-form/{id}")
    public String verifyEmailForm(@PathVariable long id, Model model) {
        model.addAttribute("id", id);
        return "verify-email-form";
    }
}

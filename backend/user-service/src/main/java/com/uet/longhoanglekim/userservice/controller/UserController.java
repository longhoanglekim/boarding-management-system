package com.uet.longhoanglekim.userservice.controller;

import com.uet.longhoanglekim.userservice.config.ApiResponse;
import com.uet.longhoanglekim.userservice.dto.ProfileInfoDTO;
import com.uet.longhoanglekim.userservice.model.UserProfile;
import com.uet.longhoanglekim.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PutMapping("/update-profile")
    public ApiResponse<?> updateProfile(@RequestBody ProfileInfoDTO profileInfo) {
        boolean success = userService.updateUserProfile(profileInfo);
        HashMap<String, Object> response = new HashMap<>();
        response.put("success", success);
        return ApiResponse.success(response, "Cập nhật profile thành công");
    }
}

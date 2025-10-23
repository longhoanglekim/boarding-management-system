package com.uet.longhoanglekim.authservice.dto;

import lombok.Data;

@Data
public class GoogleUserInfo {
    private String sub;      // ID duy nhất của user trên Google
    private String email;    // Email
    private String name;     // Tên hiển thị
    private String picture;  // Ảnh đại diện
}
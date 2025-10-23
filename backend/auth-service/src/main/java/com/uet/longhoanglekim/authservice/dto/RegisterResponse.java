package com.uet.longhoanglekim.authservice.dto;

import com.uet.longhoanglekim.authservice.constant.Provider;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterResponse {
    private String username;
    private String email;
    private Provider provider;
    private boolean isActive;
}
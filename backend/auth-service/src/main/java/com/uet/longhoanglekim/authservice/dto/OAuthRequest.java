package com.uet.longhoanglekim.authservice.dto;

import com.uet.longhoanglekim.authservice.constant.Provider;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OAuthRequest {
    private String accessToken;
    private Provider provider;
}

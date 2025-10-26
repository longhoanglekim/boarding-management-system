package com.uet.longhoanglekim.authservice.service;

import com.uet.longhoanglekim.authservice.dto.*;

public interface AuthService {
    RegisterResponse signup(RegisterInput input);
    LoginResponse login(LoginInput input);
    LoginResponse loginWithOauth(OAuthRequest request);
    boolean verifyEmail(long id);
}

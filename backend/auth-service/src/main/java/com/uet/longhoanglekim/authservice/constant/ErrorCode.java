package com.uet.longhoanglekim.authservice.constant;

import lombok.Getter;
import org.springframework.http.HttpStatus;
@Getter
public enum ErrorCode {
    // === AUTH SERVICE ERRORS ===
    AUTH_EMAIL_EXISTS("AUTH_001", "Email already exists", HttpStatus.CONFLICT),
    AUTH_INVALID_CREDENTIALS("AUTH_002", "Invalid email or password", HttpStatus.UNAUTHORIZED),
    AUTH_USER_NOT_FOUND("AUTH_003", "User not found", HttpStatus.BAD_REQUEST),
    AUTH_NOT_VERIFIED("AUTH_004", "Email not verified yet", HttpStatus.LOCKED),
    AUTH_INVALID_PASSWORD("AUTH_005", "Invalid password" , HttpStatus.UNAUTHORIZED ),
    AUTH_OAUTH_INVALID_TOKEN("AUTH_006", "Invalid oauth token" , HttpStatus.UNAUTHORIZED ),
    // === SYSTEM COMMON ERRORS ===
    INTERNAL_SERVER_ERROR("SYS_001", "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR),
    BAD_REQUEST("SYS_002", "Bad request", HttpStatus.BAD_REQUEST),
    AUTH_PROVIDER_NOT_SUPPORTED("SYS_003", "Provider not supported" , HttpStatus.UNSUPPORTED_MEDIA_TYPE ),;


    private final String code;
    private final String message;
    private final HttpStatus status;

    ErrorCode(String code, String message, HttpStatus status) {
        this.code = code;
        this.message = message;
        this.status = status;
    }
}

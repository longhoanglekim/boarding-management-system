package com.uet.longhoanglekim.roomservice.constant;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    // === ROOM FIND ERRORS ===
    ROOM_NOT_FOUND("ROOM_001", "Room not found with given id", HttpStatus.NOT_FOUND),
    ROOM_NOT_FOUND_BY_CITY("ROOM_002", "No rooms found in this city", HttpStatus.NOT_FOUND),
    ROOM_NOT_FOUND_BY_WARD("ROOM_003", "No rooms found in this ward", HttpStatus.NOT_FOUND),
    ROOM_NOT_FOUND_BY_STATUS("ROOM_004", "No rooms found with this status", HttpStatus.NOT_FOUND),
    ROOM_NOT_FOUND_BY_AREA("ROOM_005", "No rooms found with minimum area", HttpStatus.NOT_FOUND),
    ROOM_NOT_FOUND_BY_PRICE_RANGE("ROOM_006", "No rooms found within this price range", HttpStatus.NOT_FOUND),

    // === ROOM CRUD ERRORS ===
    ROOM_CREATION_FAILED("ROOM_010", "Failed to create room", HttpStatus.INTERNAL_SERVER_ERROR),
    ROOM_UPDATE_FAILED("ROOM_011", "Failed to update room", HttpStatus.BAD_REQUEST),
    ROOM_DELETE_FAILED("ROOM_012", "Failed to delete room", HttpStatus.BAD_REQUEST),

    // === SYSTEM COMMON ERRORS ===
    INTERNAL_SERVER_ERROR("SYS_001", "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR),
    BAD_REQUEST("SYS_002", "Bad request", HttpStatus.BAD_REQUEST);

    private final String code;
    private final String message;
    private final HttpStatus status;

    ErrorCode(String code, String message, HttpStatus status) {
        this.code = code;
        this.message = message;
        this.status = status;
    }
}

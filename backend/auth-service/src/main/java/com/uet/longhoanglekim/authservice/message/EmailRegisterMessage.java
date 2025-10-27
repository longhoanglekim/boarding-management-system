package com.uet.longhoanglekim.authservice.message;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
public class EmailRegisterMessage {
    private String email;
    private long userId;
}

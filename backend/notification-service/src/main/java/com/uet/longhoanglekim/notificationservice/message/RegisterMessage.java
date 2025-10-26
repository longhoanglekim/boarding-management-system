package com.uet.longhoanglekim.notificationservice.message;

import lombok.*;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterMessage {
    private String email;
    private long userId;
}

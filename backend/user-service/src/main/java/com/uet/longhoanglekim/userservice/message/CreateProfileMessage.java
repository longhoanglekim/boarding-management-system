package com.uet.longhoanglekim.userservice.message;

import com.uet.longhoanglekim.userservice.constant.Gender;
import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CreateProfileMessage {
    private String fullName;
    private Long userId;
    private String phoneNumber;
}


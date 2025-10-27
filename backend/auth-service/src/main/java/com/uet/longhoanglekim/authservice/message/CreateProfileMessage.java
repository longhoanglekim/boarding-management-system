package com.uet.longhoanglekim.authservice.message;

import com.uet.longhoanglekim.authservice.constant.Gender;
import lombok.*;

import java.time.LocalDate;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateProfileMessage {
    private String fullName;
    private Gender gender;
    private LocalDate dateOfBirth;
    private String phoneNumber;
}

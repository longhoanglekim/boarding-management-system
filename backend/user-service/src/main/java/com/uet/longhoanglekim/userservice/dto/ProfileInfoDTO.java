package com.uet.longhoanglekim.userservice.dto;

import com.uet.longhoanglekim.userservice.constant.Gender;
import lombok.*;


import java.time.LocalDate;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileInfoDTO {
    private Long id;
    private String fullName;
    private String phoneNumber;
    private String avatarUrl;
    private Gender gender;
    private LocalDate dateOfBirth;
}

package com.uet.longhoanglekim.authservice.dto;

import com.uet.longhoanglekim.authservice.constant.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterInput {
    @NotNull(message = "Tên k được để trống")
    @NotBlank(message = "Tên k được để trống")
    private String fullName;
    @NotBlank(message = "Email k được để trống")
    private String email;
    @NotBlank(message = "Password k được để trống")
    private String password;
    private Gender gender;
    private String phoneNumber;
    private LocalDate dateOfBirth;
}

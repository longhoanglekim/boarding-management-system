package com.uet.longhoanglekim.authservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterInput {
    @NotNull(message = "Tên k được để trống")
    @NotBlank(message = "Tên k được để trống")
    private String username;
    @NotBlank(message = "Email k được để trống")
    private String email;
    @NotBlank(message = "Password k được để trống")
    private String password;
}

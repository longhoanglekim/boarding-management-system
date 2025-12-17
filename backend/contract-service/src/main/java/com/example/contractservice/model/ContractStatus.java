package com.example.contractservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContractStatus {
    private String status = "PENDING";
    private boolean isSignedByOwner;
    private boolean isSignedByRenter;
    private LocalDateTime signedAtByOwner;
    private LocalDateTime signedAtByRenter;
    private LocalDateTime fullySignedAt;
}

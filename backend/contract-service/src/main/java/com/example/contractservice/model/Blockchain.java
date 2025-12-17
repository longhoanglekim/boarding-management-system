package com.example.contractservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Blockchain {
    private String contractHash;

    private String blockchainTxHash;             // tx lưu hash
    private String blockchainContractAddress;    // địa chỉ StorageContract duy nhất

    private Boolean signedOwner;                 // chủ nhà ký trong hệ thống
    private Boolean signedRenter;                // người thuê ký trong hệ thống
    private LocalDateTime ownerSignedAt;
    private LocalDateTime renterSignedAt;

    private LocalDateTime fullySignedAt;
}

package com.uet.longhoanglekim.contractservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Document("contracts")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Contract {

    @Id
    private String id;

    // Owner
    private Owner owner;

    // Renter
    private Renter renter;

    // Room
    private RoomSnapshot roomSnapshot;

    // Contract Info
    private ContractInfo contractInfo;

    // Financial term
    private FinancialTerm financialTerm;

    // Policy
    private Policy policy;

    // Blockchain
    private Blockchain blockchain;

    // Status
    private ContractStatus contractStatus;
}
@Data
@AllArgsConstructor
@NoArgsConstructor
class Owner {
    private String ownerId;
    private String ownerName;
    private String ownerPhone;
    private String ownerEmail;
}
@Data
@AllArgsConstructor
@NoArgsConstructor
class Renter {
    private String renterId;
    private String renterName;
    private String renterPhone;
    private String renterEmail;
}
@Data
@AllArgsConstructor
@NoArgsConstructor
class RoomSnapshot {
    private String roomId;
    private String roomAddress;
    private String roomType;
    private Double area;
    private Map<String, Integer> furnitureIncluded;
}
@Data
@AllArgsConstructor
@NoArgsConstructor
class ContractInfo {
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer durationMonths;
    private String renewPolicy;
    private String terminateCondition;
}
@Data
@AllArgsConstructor
@NoArgsConstructor
class FinancialTerm {
    private Double rentPrice;
    private Double depositAmount;
    private String paymentCycle;
    private String paymentMethod;
    private Double latePaymentPenalty;
    private Map<String, Double> feeDetails;
}
@Data
@AllArgsConstructor
@NoArgsConstructor
class Policy {
    private Boolean allowPets;
    private Boolean allowCooking;
    private Boolean allowSublease;
    private String maintenanceResponsibility;
}
@Data
@AllArgsConstructor
@NoArgsConstructor
class Blockchain {
    private String contractHash;

    private String blockchainTxHash;             // tx lưu hash
    private String blockchainContractAddress;    // địa chỉ StorageContract duy nhất

    private Boolean signedOwner;                 // chủ nhà ký trong hệ thống
    private Boolean signedRenter;                // người thuê ký trong hệ thống
    private LocalDateTime ownerSignedAt;
    private LocalDateTime renterSignedAt;

    private LocalDateTime fullySignedAt;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class ContractStatus {
    private String status;
    private boolean isSignedByOwner;
    private boolean isSignedByRenter;
    private LocalDateTime signedAtByOwner;
    private LocalDateTime signedAtByRenter;
    private LocalDateTime fullySignedAt;
}
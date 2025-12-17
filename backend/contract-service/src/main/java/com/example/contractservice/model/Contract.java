package com.example.contractservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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


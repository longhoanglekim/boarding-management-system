package com.example.contractservice.dto.request;

import com.example.contractservice.model.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateContractRequest {
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

    private ContractStatus contractStatus;
}

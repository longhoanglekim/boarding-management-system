package com.uet.longhoanglekim.contractservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateContractRequest {
    private String contractJson;
    private String ownerId;
    private String renterId;
    private double securityDeposit;
}

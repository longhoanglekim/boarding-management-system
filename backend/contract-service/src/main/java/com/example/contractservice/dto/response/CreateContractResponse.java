package com.example.contractservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateContractResponse {
    private String contractId;
    private String contractHash;
    private String txHash;
}

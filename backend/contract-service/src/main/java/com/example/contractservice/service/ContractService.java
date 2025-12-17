package com.example.contractservice.service;


import com.example.contractservice.dto.request.CreateContractRequest;
import com.example.contractservice.dto.response.CreateContractResponse;
import com.example.contractservice.dto.response.VerifyResponse;
import com.example.contractservice.model.Contract;

public interface ContractService {
    CreateContractResponse createContract(CreateContractRequest req) throws Exception;
    Contract getContract(String id);
    VerifyResponse verifyOnChain(String id) throws Exception;
}

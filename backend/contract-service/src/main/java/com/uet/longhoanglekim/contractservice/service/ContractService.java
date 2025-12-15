package com.uet.longhoanglekim.contractservice.service;


import com.uet.longhoanglekim.contractservice.dto.request.CreateContractRequest;
import com.uet.longhoanglekim.contractservice.dto.response.CreateContractResponse;
import com.uet.longhoanglekim.contractservice.dto.response.VerifyResponse;
import com.uet.longhoanglekim.contractservice.model.Contract;

public interface ContractService {
    CreateContractResponse createContract(CreateContractRequest req) throws Exception;
    Contract getContract(String id);
    VerifyResponse verifyOnChain(String id) throws Exception;
}

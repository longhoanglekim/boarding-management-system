package com.uet.longhoanglekim.contractservice.service.impl;

import com.uet.longhoanglekim.contractservice.dto.request.CreateContractRequest;
import com.uet.longhoanglekim.contractservice.dto.response.CreateContractResponse;
import com.uet.longhoanglekim.contractservice.dto.response.VerifyResponse;
import com.uet.longhoanglekim.contractservice.model.Contract;
import com.uet.longhoanglekim.contractservice.repository.ContractRepository;
import com.uet.longhoanglekim.contractservice.service.BlockchainService;
import com.uet.longhoanglekim.contractservice.service.ContractService;

import com.uet.longhoanglekim.contractservice.util.HashUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContractServiceImpl implements ContractService {
    private final ContractRepository repo;
    private final BlockchainService blockchainService;

    @Override
    public CreateContractResponse createContract(CreateContractRequest req) throws Exception {
        String canonical = HashUtil.canonicalize(req.getContractJson());
        String hash = HashUtil.sha256Hex(canonical);

        Contract c = Contract.builder()
                .ownerId(req.getOwnerId())
                .renterId(req.getRenterId())
                .contractJson(canonical)
                .contractHash(hash)
                .securityDeposit(req.getSecurityDeposit())
                .status("PENDING")
                .build();

        c = repo.save(c);

        String txHash = blockchainService.writeHashOnChain(c.getId(), hash);
        c.setBlockchainTxHash(txHash);
        c.setBlockchainContractAddress(System.getenv("STORAGE_CONTRACT_ADDRESS"));
        c.setStatus(ContractStatus.ACTIVE);
        repo.save(c);
        CreateContractResponse resp = new CreateContractResponse();
        resp.setContractId(c.getId());
        resp.setContractHash(hash);
        resp.setTxHash(txHash);
        return resp;
    }


    public Contract getContract(String id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
    }

    @Override
    public VerifyResponse verifyOnChain(String id) throws Exception {
        Contract c = getContract(id);
        String onChain = blockchainService.readHashOnChain(id);
        VerifyResponse r = new VerifyResponse();
        r.setOnChainHash(onChain);
        r.setMatched(onChain.equalsIgnoreCase(c.getContractHash()));
        return r;
    }
}
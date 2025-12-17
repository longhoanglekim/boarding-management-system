package com.example.contractservice.service.impl;

import com.example.contractservice.dto.request.CreateContractRequest;
import com.example.contractservice.dto.response.CreateContractResponse;
import com.example.contractservice.dto.response.VerifyResponse;
import com.example.contractservice.model.Blockchain;
import com.example.contractservice.model.Contract;
import com.example.contractservice.model.ContractStatus;
import com.example.contractservice.repository.ContractRepository;
import com.example.contractservice.service.BlockchainService;
import com.example.contractservice.service.ContractService;
import com.example.contractservice.util.HashUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContractServiceImpl implements ContractService {
    private final ContractRepository repo;
    private final BlockchainService blockchainService;

    @Override
    public CreateContractResponse createContract(CreateContractRequest req) throws Exception {
        Contract c = Contract.builder()
                .owner(req.getOwner())
                .renter(req.getRenter())
                .contractInfo(req.getContractInfo())
                .policy(req.getPolicy())
                .financialTerm(req.getFinancialTerm())
                .roomSnapshot(req.getRoomSnapshot())
                .build();

        c = repo.save(c);


        String canonical = HashUtil.canonicalize(req);
        String hash = HashUtil.sha256Hex(canonical);
        String txHash = blockchainService.writeHashOnChain(c.getId(), hash);
        Blockchain blockchain = new Blockchain();
        blockchain.setContractHash(hash);
        blockchain.setBlockchainTxHash(txHash);
        blockchain.setBlockchainContractAddress(
                System.getenv("STORAGE_CONTRACT_ADDRESS")
        );

        c.setBlockchain(blockchain);

        ContractStatus status = new ContractStatus();
        status.setStatus("ACTIVE");
        c.setContractStatus(status);

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
        r.setMatched(onChain.equalsIgnoreCase(c.getBlockchain().getContractHash()));
        return r;
    }
}
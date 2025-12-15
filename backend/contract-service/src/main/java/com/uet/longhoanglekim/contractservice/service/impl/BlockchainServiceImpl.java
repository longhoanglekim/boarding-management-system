package com.uet.longhoanglekim.contractservice.service.impl;

import com.uet.longhoanglekim.contractservice.service.BlockchainService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
@RequiredArgsConstructor
@Service
public class BlockchainServiceImpl implements BlockchainService {
    private final Web3j web3j;
    private final Credentials credentials;

    @Value("${web3.contract-address}")
    private String contractAddress;

    public String writeHashOnChain(String contractId, String hash) throws Exception {
        StorageContract contract = StorageContract.load(contractAddress, web3j, credentials, new DefaultGasProvider());
        TransactionReceipt receipt = contract.store(contractId, hash).send();
        return receipt.getTransactionHash();
    }

    public String readHashOnChain(String contractId) throws Exception {
        StorageContract contract = StorageContract.load(contractAddress, web3j, credentials, new DefaultGasProvider());
        return contract.get(contractId).send();
    }

}

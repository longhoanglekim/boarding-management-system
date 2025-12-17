package com.example.contractservice.service;

public interface BlockchainService {

    public String writeHashOnChain(String contractId, String hash) throws Exception;

    public String readHashOnChain(String contractId) throws Exception;
}

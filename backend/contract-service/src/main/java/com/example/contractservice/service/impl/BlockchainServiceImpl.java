package com.example.contractservice.service.impl;

import com.boarding.contract.RentingContract;
import com.example.contractservice.service.BlockchainService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;

@Service
@RequiredArgsConstructor
public class BlockchainServiceImpl implements BlockchainService {

    private final Web3j web3j;
    private final Credentials credentials;

    @Value("${blockchain.account-address}")
    private String contractAddress;

    // Gas provider (có thể custom sau, hiện dùng default)
    private static final ContractGasProvider GAS_PROVIDER = new DefaultGasProvider();

    // Load contract một lần để tái sử dụng (tùy chọn có thể cache)
    private RentingContract getContract() {
        return RentingContract.load(
                contractAddress,
                web3j,
                credentials,
                GAS_PROVIDER
        );
    }

    /**
     * Ghi hash của hợp đồng lên blockchain
     * @param id     contractId (key)
     * @param hash   IPFS hash hoặc hash của nội dung hợp đồng
     * @return       transaction hash
     */
    @Override
    public String writeHashOnChain(String id, String hash) throws Exception {
        TransactionReceipt receipt = getContract()
                .storeContract(id, hash)
                .send();

        return receipt.getTransactionHash();
    }

    /**
     * Đọc hash đã lưu trên blockchain theo contractId
     * @param id     contractId
     * @return       hash đã lưu (chuỗi string)
     */
    @Override
    public String readHashOnChain(String id) throws Exception {
        return getContract()
                .getContract(id)
                .send();
    }
}
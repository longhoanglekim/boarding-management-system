package com.example.contractservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.protocol.core.methods.response.EthGetCode;
import org.web3j.protocol.http.HttpService;

import java.io.IOException;

@SpringBootApplication
public class ContractServiceCloneApplication {

    public static void main(String[] args) throws IOException {
        String contractAddress = "0x34b7cdb409784b1d2ff688f71a8d478e2f194c7d";
        Web3j web3j = Web3j.build(new HttpService("https://dark-bold-patron.ethereum-sepolia.quiknode.pro/f3e9cf61e95fbc71692eec635f6cb0ba7e2eee7f/"));
        EthGetBalance balance = web3j.ethGetBalance(
                contractAddress,
                DefaultBlockParameterName.LATEST
        ).send();

        System.out.println("Balance: " + balance.getBalance());



        EthGetCode code = web3j.ethGetCode(
                contractAddress,
                DefaultBlockParameterName.LATEST
        ).send();

        System.out.println("Code: " + code.getCode());



        SpringApplication.run(ContractServiceCloneApplication.class, args);
    }

}

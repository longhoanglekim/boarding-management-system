package com.example.contractservice.repository;


import com.example.contractservice.model.Contract;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContractRepository extends MongoRepository<Contract, String> {

}

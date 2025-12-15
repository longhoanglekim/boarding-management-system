package com.uet.longhoanglekim.contractservice.repository;

import com.uet.longhoanglekim.contractservice.model.Contract;


import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;
public interface ContractRepository extends MongoRepository<Contract, String> {
    List<Contract> findByOwnerId(String ownerId);
    List<Contract> findByRenterId(String renterId);

}

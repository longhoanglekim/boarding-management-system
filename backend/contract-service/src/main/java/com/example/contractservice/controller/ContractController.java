package com.example.contractservice.controller;

;

import com.example.contractservice.dto.request.CreateContractRequest;
import com.example.contractservice.dto.response.CreateContractResponse;
import com.example.contractservice.dto.response.VerifyResponse;
import com.example.contractservice.model.Contract;
import com.example.contractservice.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/contracts")
@RequiredArgsConstructor
public class ContractController {
    private final ContractService contractService;

    @PostMapping
    public ResponseEntity<CreateContractResponse> create(@RequestBody CreateContractRequest req) throws Exception {
        return ResponseEntity.ok(contractService.createContract(req));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contract> get(@PathVariable String id) {
        return ResponseEntity.ok(contractService.getContract(id));
    }

    @GetMapping("/{id}/verify")
    public ResponseEntity<VerifyResponse> verify(@PathVariable String id) throws Exception {
        return ResponseEntity.ok(contractService.verifyOnChain(id));
    }
}

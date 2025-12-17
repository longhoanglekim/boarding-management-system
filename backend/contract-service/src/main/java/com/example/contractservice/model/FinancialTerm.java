package com.example.contractservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FinancialTerm {
    private Double rentPrice;
    private Double depositAmount;
    private String paymentCycle;
    private String paymentMethod;
    private Double latePaymentPenalty;
    private Map<String, Double> feeDetails;
}

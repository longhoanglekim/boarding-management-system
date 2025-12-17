package com.example.contractservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContractInfo {
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer durationMonths;
    private String renewPolicy;
    private String terminateCondition;
}

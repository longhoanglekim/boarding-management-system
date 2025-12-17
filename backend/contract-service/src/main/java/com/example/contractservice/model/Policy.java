package com.example.contractservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Policy {
    private Boolean allowPets;
    private Boolean allowCooking;
    private Boolean allowSublease;
    private String maintenanceResponsibility;
}

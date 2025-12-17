package com.example.contractservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Renter {
    private String renterId;
    private String renterName;
    private String renterPhone;
    private String renterEmail;
}

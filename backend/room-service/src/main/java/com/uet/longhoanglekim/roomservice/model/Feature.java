package com.uet.longhoanglekim.roomservice.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Feature {
    private double basePrice;
    private double electricityPrice;
    private double waterPrice;
    private double servicePrice;
    private boolean hasAirConditioner;
    private boolean hasWashingMachine;
    private boolean hasParking;
    private boolean hasKitchen;
    private boolean hasBalcony;
    private boolean hasPetAllowed;
    private boolean hasDishwasher;
}
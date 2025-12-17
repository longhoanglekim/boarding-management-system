package com.example.contractservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomSnapshot {
    private String roomId;
    private String roomAddress;
    private String roomType;
    private Double area;
    private Map<String, Integer> furnitureIncluded;
}

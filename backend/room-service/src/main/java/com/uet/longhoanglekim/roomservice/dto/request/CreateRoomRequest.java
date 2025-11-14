package com.uet.longhoanglekim.roomservice.dto.request;


import com.uet.longhoanglekim.roomservice.model.Feature;
import com.uet.longhoanglekim.roomservice.model.Location;
import lombok.Data;

import java.util.List;

@Data
public class CreateRoomRequest {
    private Long ownerId;
    private String title;
    private String description;
    private Location location;
    private double area;
    private String status; // AVAILABLE, RENTED, MAINTENANCE
    private Feature feature;
    private List<String> images;
}
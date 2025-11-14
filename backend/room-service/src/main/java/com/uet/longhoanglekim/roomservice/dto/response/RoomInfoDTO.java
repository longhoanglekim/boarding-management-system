package com.uet.longhoanglekim.roomservice.dto.response;

import com.uet.longhoanglekim.roomservice.model.Feature;
import com.uet.longhoanglekim.roomservice.model.Location;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomInfoDTO {
    private Long ownerId;
    private String title;
    private String description;
    private Location location;
    private double area;
    private String status; // AVAILABLE, RENTED, MAINTENANCE
    private Feature feature;
    private List<String> images;
}

package com.uet.longhoanglekim.roomservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "rooms")
public class Room {
    @Id
    private String id;

    private Long ownerId;
    private String title;
    private String description;
    private Location location;
    private double area;
    private String status; // AVAILABLE, RENTED, MAINTENANCE

    private Feature feature;
    private List<String> images;

    private long createdAt;
}

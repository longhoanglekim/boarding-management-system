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

    private String title;
    private String description;

    private double price;
    private double deposit;
    private double area;

    private List<String> images;
    private List<String> amenities;

    private Location location;
    private String status;
    private String ownerId;      // match FE
    private boolean isActive;

    private long createdAt;

    // optional – dùng khi join owner info
    private Owner owner;
}

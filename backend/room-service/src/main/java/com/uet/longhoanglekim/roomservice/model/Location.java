package com.uet.longhoanglekim.roomservice.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Location {
    private String city;
    private String ward;
    private double latitude;
    private double longitude;
    private String addressDetail;
}
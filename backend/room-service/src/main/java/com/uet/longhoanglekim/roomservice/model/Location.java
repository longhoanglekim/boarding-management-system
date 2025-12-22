package com.uet.longhoanglekim.roomservice.model;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Location {
    private String province;
    private String district;
    private String ward;      // optional
    private String address;
}
package com.uet.longhoanglekim.paymentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VerifierBody {
    private String gateway;
    private String rawBody;
}

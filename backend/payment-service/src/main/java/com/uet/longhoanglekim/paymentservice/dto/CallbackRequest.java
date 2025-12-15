package com.uet.longhoanglekim.paymentservice.dto;

import lombok.*;
import java.util.Map;
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CallbackRequest {
    private String provider; // "MOMO" or "ZALOPAY"
    private Map<String, Object> payload;
}
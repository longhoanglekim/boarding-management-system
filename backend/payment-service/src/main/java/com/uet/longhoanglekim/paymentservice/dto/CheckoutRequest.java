package com.uet.longhoanglekim.paymentservice.dto;

import com.uet.longhoanglekim.paymentservice.constant.StoredPaymentType;
import lombok.*;
import java.util.Map;
import java.math.BigDecimal;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CheckoutRequest {
    private Long invoiceId;
    private String gateway;
    String callbackUrl;
    private BigDecimal amount;
}
package com.uet.longhoanglekim.paymentservice.dto;

import com.uet.longhoanglekim.paymentservice.constant.UtilityType;
import lombok.*;
import java.math.BigDecimal;
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UtilityReadingDTO {
    private Long roomId;
    private UtilityType type;
    private Integer oldValue;
    private Integer newValue;
    private BigDecimal unitPrice;
    private Integer month;
    private Integer year;
}
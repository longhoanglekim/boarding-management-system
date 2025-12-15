package com.uet.longhoanglekim.paymentservice.model;

import com.uet.longhoanglekim.paymentservice.constant.UtilityType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "utility_readings")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class UtilityReading {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_id", nullable = false)
    private Long roomId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UtilityType type;

    @Column(name = "old_value", nullable = false)
    private Integer oldValue;

    @Column(name = "new_value", nullable = false)
    private Integer newValue;

    @Column(name = "unit_price", precision = 10, scale = 2, nullable = false)
    private BigDecimal unitPrice;

    private Integer month;

    private Integer year;

    @Column(name = "generated_invoice_id")
    private Long generatedInvoiceId;

    @Column(name = "created_at",
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;
}
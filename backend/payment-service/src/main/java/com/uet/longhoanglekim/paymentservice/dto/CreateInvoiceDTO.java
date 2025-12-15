package com.uet.longhoanglekim.paymentservice.dto;

import com.uet.longhoanglekim.paymentservice.constant.InvoiceType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateInvoiceDTO {
    private Long contractId;
    private InvoiceType invoiceType;
    private BigDecimal amount;
    private LocalDate dueDate;
    private String details;
}

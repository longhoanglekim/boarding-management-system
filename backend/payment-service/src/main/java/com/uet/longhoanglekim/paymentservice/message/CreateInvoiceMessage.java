package com.uet.longhoanglekim.paymentservice.message;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateInvoiceMessage {
    private Long invoiceNumber;
    private String message;
}

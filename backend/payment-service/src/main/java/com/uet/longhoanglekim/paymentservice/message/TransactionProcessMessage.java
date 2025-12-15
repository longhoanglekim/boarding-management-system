package com.uet.longhoanglekim.paymentservice.message;

import com.uet.longhoanglekim.paymentservice.constant.InvoiceStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionProcessMessage {
    private String invoiceId;
    private String message;
}

package com.uet.longhoanglekim.paymentservice.service;

import com.uet.longhoanglekim.paymentservice.dto.CreateInvoiceDTO;
import com.uet.longhoanglekim.paymentservice.model.Invoice;
import com.uet.longhoanglekim.paymentservice.model.PaymentTransaction;

import java.util.List;

public interface InvoiceService {
    boolean createInvoice(CreateInvoiceDTO createInvoiceDTO);
    boolean markPaid(Long invoiceId);
    boolean markOverdue(Long invoiceId);
    List<Invoice> getInvoices();
    List<Invoice> getPaidInvoices();
    List<Invoice> getUserPaidInvoices(Long invoiceId);
    List<Invoice> getUserOverdueInvoices(Long invoiceId);
    Invoice getInvoice(Long invoiceId);

}

package com.uet.longhoanglekim.paymentservice.repository;

import com.uet.longhoanglekim.paymentservice.constant.InvoiceStatus;
import com.uet.longhoanglekim.paymentservice.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
    Optional<Invoice> findById(long id);
    List<Invoice> findInvoiceByStatus(InvoiceStatus status);
    List<Invoice> findInvoiceByUserIdAndStatus(Long userId,InvoiceStatus status);
}

package com.uet.longhoanglekim.paymentservice.service.impl;

import com.uet.longhoanglekim.paymentservice.config.KafkaProducerConfig;
import com.uet.longhoanglekim.paymentservice.constant.ErrorCode;
import com.uet.longhoanglekim.paymentservice.constant.InvoiceStatus;
import com.uet.longhoanglekim.paymentservice.dto.CreateInvoiceDTO;
import com.uet.longhoanglekim.paymentservice.exception.BusinessException;
import com.uet.longhoanglekim.paymentservice.message.CreateInvoiceMessage;
import com.uet.longhoanglekim.paymentservice.model.Invoice;
import com.uet.longhoanglekim.paymentservice.repository.InvoiceRepository;
import com.uet.longhoanglekim.paymentservice.service.InvoiceService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import javax.print.DocFlavor;
import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final KafkaProducerConfig kafkaProducerConfig;
    @Transactional
    @Override
    public boolean createInvoice(CreateInvoiceDTO createInvoiceDTO) throws BusinessException {
        Invoice invoice = new Invoice();
        invoice.setContractId(createInvoiceDTO.getContractId());
        invoice.setInvoiceType(createInvoiceDTO.getInvoiceType());
        invoice.setAmount(createInvoiceDTO.getAmount());
        invoice.setDetails(createInvoiceDTO.getDetails());
        invoice.setDueDate(createInvoiceDTO.getDueDate());

        // month dạng số để lưu DB
        invoice.setMonth(LocalDate.now().getMonth().getValue());

        try {
            invoiceRepository.save(invoice);

            String monthString = LocalDate.now()
                    .getMonth()
                    .getDisplayName(TextStyle.FULL, Locale.ENGLISH);  // "December"

            CreateInvoiceMessage createInvoiceMessage = new CreateInvoiceMessage();
            createInvoiceMessage.setInvoiceNumber(invoice.getId());
            createInvoiceMessage.setMessage("Invoice "
                    + invoice.getInvoiceType()
                    + " of " + monthString + " has been created.");

            kafkaProducerConfig
                    .createInvoiceMessageKafkaTemplate()
                    .send("create_invoice", createInvoiceMessage);

            return true;
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }


    @Transactional
    @Override
    public boolean markPaid(Long invoiceId) throws BusinessException {
        Optional<Invoice> optInv = invoiceRepository.findById(invoiceId);
        try {
            Invoice invoice = optInv.get();
            invoiceRepository.save(invoice);
            return true;
        }
        catch (Exception e) {
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

    }

    @Transactional
    @Override
    public boolean markOverdue(Long invoiceId) throws BusinessException {
        Optional<Invoice> optionalInvoice = invoiceRepository.findById(invoiceId);

//        kafkaTemplate.send("invoice_overdue", "{\"invoiceId\":"+invoiceId+"}");
        try {
            Invoice inv =  optionalInvoice.get();
            inv.setStatus(InvoiceStatus.OVERDUE);
            invoiceRepository.save(inv);
            return true;
        }
        catch (Exception e) {
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public List<Invoice> getInvoices() {
        return invoiceRepository.findAll();
    }

    @Override
    public List<Invoice> getPaidInvoices() {
        return invoiceRepository.findInvoiceByStatus(InvoiceStatus.PAID);
    }

    @Override
    public List<Invoice> getUserPaidInvoices(Long invoiceId) {
        return invoiceRepository.findInvoiceByUserIdAndStatus(invoiceId, InvoiceStatus.PAID);
    }

    @Override
    public List<Invoice> getUserOverdueInvoices(Long invoiceId) {
        return invoiceRepository.findInvoiceByUserIdAndStatus(invoiceId, InvoiceStatus.OVERDUE);
    }


    @Override
    public Invoice getInvoice(Long invoiceId) {
        try {
            Invoice invoice = invoiceRepository.findById(invoiceId).get();
            return invoice;
        }
        catch (Exception e) {
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }
}

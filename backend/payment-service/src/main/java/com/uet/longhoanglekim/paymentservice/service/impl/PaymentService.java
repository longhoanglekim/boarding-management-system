package com.uet.longhoanglekim.paymentservice.service.impl;

import com.uet.longhoanglekim.paymentservice.config.payment.VNPAYConfig;
import com.uet.longhoanglekim.paymentservice.constant.ErrorCode;
import com.uet.longhoanglekim.paymentservice.dto.PaymentDTO;
import com.uet.longhoanglekim.paymentservice.exception.BusinessException;
import com.uet.longhoanglekim.paymentservice.util.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final VNPAYConfig vnPayConfig;
    public PaymentDTO.VNPayResponse createVnPayPayment(HttpServletRequest request) {
        long amount = Integer.parseInt(request.getParameter("amount")) * 100L;
        String bankCode = request.getParameter("bankCode");
        Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig();
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
        if (bankCode != null && !bankCode.isEmpty()) {
            vnpParamsMap.put("vnp_BankCode", bankCode);
        }
        vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));
        //build query url
        String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
        String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
        String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;
        return PaymentDTO.VNPayResponse.builder()
                .code("ok")
                .message("success")
                .paymentUrl(paymentUrl).build();
    }

    public PaymentDTO.VNPayResponse handleVnPayCallback(HttpServletRequest request) {

        Map<String, String> vnpParams = new HashMap<>();
        Enumeration<String> paramNames = request.getParameterNames();

        while (paramNames.hasMoreElements()) {
            String paramName = paramNames.nextElement();
            vnpParams.put(paramName, request.getParameter(paramName));
        }

        String vnpSecureHash = vnpParams.get("vnp_SecureHash");

        // 1. Verify checksum
        boolean isValidChecksum = VNPayUtil.verifySignature(
                new HashMap<>(vnpParams),
                vnPayConfig.getSecretKey(),
                vnpSecureHash
        );

        if (!isValidChecksum) {
            throw new BusinessException(ErrorCode.INVALID_SIGNATURE);
        }

        // 2. Check payment status
        String responseCode = vnpParams.get("vnp_ResponseCode");
        String transactionStatus = vnpParams.get("vnp_TransactionStatus");

        if ("00".equals(responseCode) && "00".equals(transactionStatus)) {
            // ✅ Thanh toán thành công
            return PaymentDTO.VNPayResponse.builder()
                    .code("00")
                    .message("Payment success")
                    .paymentUrl(null)
                    .build();
        }

        // ❌ Thanh toán thất bại
        return PaymentDTO.VNPayResponse.builder()
                .code(responseCode)
                .message("Payment failed")
                .paymentUrl(null)
                .build();
    }

    public boolean verifyVnPayResponse(HttpServletRequest request) {
        Map<String, String> params = new HashMap<>();
        Enumeration<String> names = request.getParameterNames();

        while (names.hasMoreElements()) {
            String name = names.nextElement();
            params.put(name, request.getParameter(name));
        }

        String secureHash = params.get("vnp_SecureHash");

        params.remove("vnp_SecureHash");
        params.remove("vnp_SecureHashType");

        String hashData = VNPayUtil.getPaymentURL(params, false);
        String calculatedHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);

        return calculatedHash.equalsIgnoreCase(secureHash);
    }

}
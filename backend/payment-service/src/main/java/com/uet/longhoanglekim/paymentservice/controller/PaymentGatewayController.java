package com.uet.longhoanglekim.paymentservice.controller;
;
import com.uet.longhoanglekim.paymentservice.config.ApiResponse;
import com.uet.longhoanglekim.paymentservice.constant.ErrorCode;
import com.uet.longhoanglekim.paymentservice.dto.CheckoutRequest;
import com.uet.longhoanglekim.paymentservice.dto.PaymentDTO;
import com.uet.longhoanglekim.paymentservice.dto.VerifierBody;
import com.uet.longhoanglekim.paymentservice.exception.BusinessException;
import com.uet.longhoanglekim.paymentservice.service.impl.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentGatewayController {
    private final PaymentService paymentService;

    @GetMapping("/vn-pay")
    public ApiResponse<PaymentDTO.VNPayResponse> pay(HttpServletRequest request) {
        return ApiResponse.success(paymentService.createVnPayPayment(request), "Success", HttpStatus.OK);
    }
    @GetMapping("/vn-pay-callback")
    public ApiResponse<PaymentDTO.VNPayResponse> payCallbackHandler(HttpServletRequest request) {
        String status = request.getParameter("vnp_ResponseCode");
        if (status.equals("00")) {
            return ApiResponse.success(PaymentDTO.VNPayResponse.builder()
                    .code("00")
                    .message("Success")
                    .paymentUrl("https://payment.url")
                    .build(), "Success", HttpStatus.OK);
        } else {
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }
}
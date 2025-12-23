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
            return ApiResponse.success(
                    paymentService.handleVnPayCallback(request),
                    "VNPay callback handled",
                    HttpStatus.OK
            );
        }
        @PostMapping("/vn-pay-ipn")
        public ResponseEntity<String> vnPayIpn(HttpServletRequest request) {

            boolean isValid = paymentService.verifyVnPayResponse(request);

            if (!isValid) {
                return ResponseEntity.badRequest().body("INVALID SIGNATURE");
            }

            String responseCode = request.getParameter("vnp_ResponseCode");
            String transactionStatus = request.getParameter("vnp_TransactionStatus");
            String txnRef = request.getParameter("vnp_TxnRef");

            if ("00".equals(responseCode) && "00".equals(transactionStatus)) {
                // ✅ UPDATE ORDER = PAID
                // orderService.markPaid(txnRef);

                return ResponseEntity.ok("SUCCESS");
            }

            return ResponseEntity.ok("FAILED");
        }

    }
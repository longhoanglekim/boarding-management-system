package com.uet.longhoanglekim.notificationservice.service.impl;

import com.uet.longhoanglekim.notificationservice.service.MailService;
import com.uet.longhoanglekim.notificationservice.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final MailService mailService;
    @Override
    public void sendVerifyRegisteredAccount(String email, long userId) {
        String path = "http://localhost:8080/api/auth/verify-email-form/" + userId;
        String text = String.format(
                "Đề nghị bạn hãy xác thực việc tạo tài khoản cho StayEasy bằng cách nhấn vào link sau %s",
                path
        );

        mailService.sendMail(email, "Xác thực tạo tài khoản cho StayEasy", text);
    }
}

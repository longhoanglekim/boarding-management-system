package com.uet.longhoanglekim.notificationservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailSender;
import org.springframework.stereotype.Service;

public interface MailService {
    public void sendMail(String to, String subject, String text);

}

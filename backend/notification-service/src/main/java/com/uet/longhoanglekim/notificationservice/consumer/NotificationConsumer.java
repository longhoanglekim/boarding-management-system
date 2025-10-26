package com.uet.longhoanglekim.notificationservice.consumer;

import com.uet.longhoanglekim.notificationservice.message.RegisterMessage;
import com.uet.longhoanglekim.notificationservice.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationConsumer {
    private final NotificationService notificationService;
    @KafkaListener(topics = "user_registered", groupId = "notification-group",
            containerFactory = "registerKafkaListenerContainerFactory")
    public void consumeRegisterMessage(RegisterMessage registerMessage) {
        notificationService.sendVerifyRegisteredAccount(registerMessage.getEmail(), registerMessage.getUserId());
    }
}

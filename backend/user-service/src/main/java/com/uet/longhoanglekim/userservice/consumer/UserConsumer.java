package com.uet.longhoanglekim.userservice.consumer;

import com.uet.longhoanglekim.userservice.message.CreateProfileMessage;
import com.uet.longhoanglekim.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserConsumer {
    private final UserService userService;
    @KafkaListener(topics = "create_user_profile", groupId = "user-group",
            containerFactory = "createProfileKafkaListenerContainerFactory")
    public void consumeRegisterMessage(CreateProfileMessage createProfileMessage) {
        userService.createUserProfile(createProfileMessage);
    }

}

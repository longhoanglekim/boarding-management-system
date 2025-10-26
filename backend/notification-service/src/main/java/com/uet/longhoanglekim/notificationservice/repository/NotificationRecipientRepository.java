package com.uet.longhoanglekim.notificationservice.repository;

import com.uet.longhoanglekim.notificationservice.model.NotificationRecipient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRecipientRepository extends JpaRepository<NotificationRecipient, Long> {
}

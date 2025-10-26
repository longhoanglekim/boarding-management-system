package com.uet.longhoanglekim.notificationservice.model;

import com.uet.longhoanglekim.notificationservice.constant.Channel;
import com.uet.longhoanglekim.notificationservice.constant.TargetType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

import lombok.*;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long senderId; // Ai gửi (admin, system, user...)

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Channel channel = Channel.IN_APP;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TargetType targetType = TargetType.USER;

    @Column(nullable = false, name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();


}

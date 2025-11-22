package com.uet.longhoanglekim.roomservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "rental_posts")
public class RentalPost {
    @Id
    private String id;
    private String roomId;          // Tham chiếu đến Room
    private String ownerId;         // Ai đăng tin (chủ trọ)
    private String title;
    private String description;
    private List<String> images;    // Ảnh quảng cáo
    private String status;      // ACTIVE, INACTIVE, EXPIRED, PENDING_APPROVAL
    private int viewCounts;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime expiredAt;

    private boolean isPriority;
}

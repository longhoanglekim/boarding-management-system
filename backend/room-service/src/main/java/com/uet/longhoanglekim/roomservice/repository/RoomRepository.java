package com.uet.longhoanglekim.roomservice.repository;

import com.uet.longhoanglekim.roomservice.model.Room;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;
public interface RoomRepository extends MongoRepository<Room, String> {
    // 🔍 Lấy phòng đang active
    List<Room> findByIsActiveTrue();

    // 👤 Phòng theo chủ
    List<Room> findByOwnerId(String ownerId);

    // 👤 Phòng active theo chủ
    List<Room> findByOwnerIdAndIsActiveTrue(String ownerId);

    // 🔎 Tìm theo tỉnh
    List<Room> findByLocation_Province(String province);

    // 🔎 Tìm theo tỉnh + active
    List<Room> findByLocation_ProvinceAndIsActiveTrue(String province);

    // 💰 Lọc theo giá
    List<Room> findByPriceBetween(double min, double max);

    // ❌ Soft delete
    long deleteByOwnerId(String ownerId);
}

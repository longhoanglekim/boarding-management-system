package com.uet.longhoanglekim.roomservice.service;


import com.uet.longhoanglekim.roomservice.dto.request.UpdateRoomRequest;
import com.uet.longhoanglekim.roomservice.model.Room;

import java.util.List;
import java.util.Optional;

public interface RoomService {
    // Lấy tất cả phòng
    List<Room> getAllRooms();

    // Lấy phòng theo ID
    Room getRoomById(String id);

    // Lọc phòng theo thành phố
    List<Room> getRoomsByCity(String city);

    // Lọc phòng theo phường
    List<Room> getRoomsByWard(String ward);

    // Lọc phòng theo trạng thái
    List<Room> getRoomsByStatus(String status);

    // Lọc phòng có diện tích tối thiểu
    List<Room> getRoomsByMinArea(double area);

    // Lọc phòng theo khoảng giá
    List<Room> getRoomsByPriceRange(double startPrice, double endPrice);

    // Tạo mới phòng
    void createRoom(Room room);

    // Cập nhật phòng
    void updateRoom(String id, UpdateRoomRequest updateRoomRequest);

    // Xóa phòng
    void deleteRoom(String id);
}

package com.uet.longhoanglekim.roomservice.service.impl;

import com.uet.longhoanglekim.roomservice.constant.ErrorCode;
import com.uet.longhoanglekim.roomservice.dto.request.UpdateRoomRequest;
import com.uet.longhoanglekim.roomservice.exception.BusinessException;
import com.uet.longhoanglekim.roomservice.model.Room;
import com.uet.longhoanglekim.roomservice.repository.RoomRepository;
import com.uet.longhoanglekim.roomservice.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    // ===========================
    //       CRUD OPERATIONS
    // ===========================

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Room getRoomById(String id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.ROOM_NOT_FOUND));
    }

    @Override
    public void createRoom(Room room) {
        try {
            roomRepository.save(room);
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.ROOM_CREATION_FAILED);
        }
    }

    @Override
    public void updateRoom(String id, UpdateRoomRequest updatedRoom) {
        Room existing = roomRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.ROOM_NOT_FOUND));

        try {
            existing.setTitle(updatedRoom.getTitle());
            existing.setDescription(updatedRoom.getDescription());
            existing.setStatus(updatedRoom.getStatus());
            existing.setFeature(updatedRoom.getFeature());

            roomRepository.save(existing);
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.ROOM_UPDATE_FAILED);
        }
    }

    @Override
    public void deleteRoom(String id) {
        if (!roomRepository.existsById(id)) {
            throw new BusinessException(ErrorCode.ROOM_NOT_FOUND);
        }

        try {
            roomRepository.deleteById(id);
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.ROOM_DELETE_FAILED);
        }
    }

    // ===========================
    //        QUERY METHODS
    // ===========================

    @Override
    public List<Room> getRoomsByCity(String city) {
        List<Room> rooms = roomRepository.findByLocation_city(city);

        if (rooms.isEmpty()) {
            throw new BusinessException(ErrorCode.ROOM_NOT_FOUND_BY_CITY);
        }
        return rooms;
    }

    @Override
    public List<Room> getRoomsByWard(String ward) {
        List<Room> rooms = roomRepository.findByLocation_ward(ward);

        if (rooms.isEmpty()) {
            throw new BusinessException(ErrorCode.ROOM_NOT_FOUND_BY_WARD);
        }
        return rooms;
    }

    @Override
    public List<Room> getRoomsByStatus(String status) {
        List<Room> rooms = roomRepository.findByStatus(status);

        if (rooms.isEmpty()) {
            throw new BusinessException(ErrorCode.ROOM_NOT_FOUND_BY_STATUS);
        }
        return rooms;
    }

    @Override
    public List<Room> getRoomsByMinArea(double area) {
        List<Room> rooms = roomRepository.findByAreaGreaterThanEqual(area);

        if (rooms.isEmpty()) {
            throw new BusinessException(ErrorCode.ROOM_NOT_FOUND_BY_AREA);
        }
        return rooms;
    }

    @Override
    public List<Room> getRoomsByPriceRange(double startPrice, double endPrice) {
        List<Room> rooms = roomRepository.findByFeature_basePriceBetween(startPrice, endPrice);

        if (rooms.isEmpty()) {
            throw new BusinessException(ErrorCode.ROOM_NOT_FOUND_BY_PRICE_RANGE);
        }
        return rooms;
    }
}

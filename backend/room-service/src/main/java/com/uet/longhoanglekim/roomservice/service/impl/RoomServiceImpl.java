package com.uet.longhoanglekim.roomservice.service.impl;

import com.uet.longhoanglekim.roomservice.model.Room;
import com.uet.longhoanglekim.roomservice.repository.RoomRepository;
import com.uet.longhoanglekim.roomservice.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    @Override
    public List<Room> getAllActiveRooms() {
        return roomRepository.findByIsActiveTrue();
    }

    @Override
    public Optional<Room> getRoomById(String id) {
        return roomRepository.findById(id);
    }

    @Override
    public List<Room> getRoomsByOwner(String ownerId) {
        return roomRepository.findByOwnerId(ownerId);
    }

    @Override
    public Room createRoom(Room room) {
        room.setActive(true);
        room.setCreatedAt(System.currentTimeMillis());
        return roomRepository.save(room);
    }

    @Override
    public Optional<Room> updateRoom(String id, Room update) {
        return roomRepository.findById(id).map(room -> {
            room.setTitle(update.getTitle());
            room.setDescription(update.getDescription());
            room.setPrice(update.getPrice());
            room.setDeposit(update.getDeposit());
            room.setArea(update.getArea());
            room.setImages(update.getImages());
            room.setAmenities(update.getAmenities());
            room.setLocation(update.getLocation());
            room.setActive(update.isActive());
            return roomRepository.save(room);
        });
    }

    @Override
    public boolean deleteRoom(String id) {
        return roomRepository.findById(id).map(room -> {
            room.setActive(false);
            roomRepository.save(room);
            return true;
        }).orElse(false);
    }
}

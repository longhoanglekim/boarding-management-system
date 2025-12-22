package com.uet.longhoanglekim.roomservice.service;

import com.uet.longhoanglekim.roomservice.model.Room;

import java.util.List;
import java.util.Optional;

public interface RoomService {

    List<Room> getAllActiveRooms();

    Optional<Room> getRoomById(String id);

    List<Room> getRoomsByOwner(String ownerId);

    Room createRoom(Room room);

    Optional<Room> updateRoom(String id, Room update);

    boolean deleteRoom(String id);
}

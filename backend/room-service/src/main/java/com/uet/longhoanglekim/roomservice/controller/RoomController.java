package com.uet.longhoanglekim.roomservice.controller;

import com.uet.longhoanglekim.roomservice.config.ApiResponse;
import com.uet.longhoanglekim.roomservice.model.Room;
import com.uet.longhoanglekim.roomservice.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomRepository roomRepository;

    // ✅ GET all active rooms
    @GetMapping("/public/active")
    public ApiResponse<List<Room>> getAllActiveRooms() {
        return ApiResponse.success(
                roomRepository.findByIsActiveTrue(),
                "Get active rooms successfully"
        );
    }

    // ✅ GET room by id
    @GetMapping("/public/{id}")
    public ApiResponse<?> getRoomById(@PathVariable String id) {
        return roomRepository.findById(id)
                .map(room -> ApiResponse.success(room, "Get room successfully"))
                .orElse(ApiResponse.error("Room not found"));
    }

    // ✅ GET rooms by owner
    @GetMapping("/public/owner/{ownerId}")
    public ApiResponse<List<Room>> getRoomsByOwner(@PathVariable String ownerId) {
        return ApiResponse.success(
                roomRepository.findByOwnerId(ownerId),
                "Get rooms by owner successfully"
        );
    }

    // ✅ CREATE room
    @PostMapping
    public ApiResponse<Room> createRoom(@RequestBody Room room) {
        room.setActive(true);
        room.setCreatedAt(System.currentTimeMillis());

        return ApiResponse.success(
                roomRepository.save(room),
                "Create room successfully"
        );
    }

    // ✅ UPDATE room
    @PutMapping("/{id}")
    public ApiResponse<?> updateRoom(
            @PathVariable String id,
            @RequestBody Room update
    ) {
        return roomRepository.findById(id)
                .map(room -> {
                    room.setTitle(update.getTitle());
                    room.setDescription(update.getDescription());
                    room.setPrice(update.getPrice());
                    room.setDeposit(update.getDeposit());
                    room.setArea(update.getArea());
                    room.setImages(update.getImages());
                    room.setAmenities(update.getAmenities());
                    room.setLocation(update.getLocation());
                    room.setActive(update.isActive());

                    return ApiResponse.success(
                            roomRepository.save(room),
                            "Update room successfully"
                    );
                })
                .orElse(ApiResponse.error("Room not found"));
    }

    // ✅ SOFT DELETE room
    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteRoom(@PathVariable String id) {
        return roomRepository.findById(id)
                .map(room -> {
                    room.setActive(false);
                    roomRepository.save(room);
                    return ApiResponse.success(null, "Delete room successfully");
                })
                .orElse(ApiResponse.error("Room not found"));
    }
}

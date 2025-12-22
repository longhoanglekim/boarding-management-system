package com.uet.longhoanglekim.roomservice.controller;

import com.uet.longhoanglekim.roomservice.config.ApiResponse;
import com.uet.longhoanglekim.roomservice.model.Room;
import com.uet.longhoanglekim.roomservice.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    @GetMapping("/public/active")
    public ApiResponse<List<Room>> getAllActiveRooms() {
        return ApiResponse.success(
                roomService.getAllActiveRooms(),
                "Get active rooms successfully"
        );
    }

    @GetMapping("/public/{id}")
    public ApiResponse<?> getRoomById(@PathVariable String id) {
        return roomService.getRoomById(id)
                .map(room -> ApiResponse.success(room, "Get room successfully"))
                .orElse(ApiResponse.error("Room not found"));
    }

    @GetMapping("/public/owner/{ownerId}")
    public ApiResponse<List<Room>> getRoomsByOwner(@PathVariable String ownerId) {
        return ApiResponse.success(
                roomService.getRoomsByOwner(ownerId),
                "Get rooms by owner successfully"
        );
    }

    @PostMapping
    public ApiResponse<Room> createRoom(@RequestBody Room room) {
        return ApiResponse.success(
                roomService.createRoom(room),
                "Create room successfully"
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<?> updateRoom(
            @PathVariable String id,
            @RequestBody Room update
    ) {
        return roomService.updateRoom(id, update)
                .map(r -> ApiResponse.success(r, "Update room successfully"))
                .orElse(ApiResponse.error("Room not found"));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteRoom(@PathVariable String id) {
        return roomService.deleteRoom(id)
                ? ApiResponse.success(null, "Delete room successfully")
                : ApiResponse.error("Room not found");
    }
}

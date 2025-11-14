package com.uet.longhoanglekim.roomservice.controller;

import com.uet.longhoanglekim.roomservice.config.ApiResponse;
import com.uet.longhoanglekim.roomservice.dto.request.CreateRoomRequest;
import com.uet.longhoanglekim.roomservice.dto.request.UpdateRoomRequest;
import com.uet.longhoanglekim.roomservice.mappers.RoomMapper;
import com.uet.longhoanglekim.roomservice.model.Room;
import com.uet.longhoanglekim.roomservice.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    // ===========================
    //        GET LIST
    // ===========================

    @GetMapping
    public ApiResponse<?> getAll() {
        return ApiResponse.success(roomService.getAllRooms(), "Get all rooms successfully");
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getById(@PathVariable String id) {
        Room room = roomService.getRoomById(id);
        return ApiResponse.success(RoomMapper.toRoomInfoDTO(room),"Get room by id successfully");
    }

    @GetMapping("/city/{city}")
    public ApiResponse<?> getByCity(@PathVariable String city) {
        return ApiResponse.success(roomService.getRoomsByCity(city), "Get rooms by city successfully");
    }

    @GetMapping("/ward/{ward}")
    public ApiResponse<?> getByWard(@PathVariable String ward) {
        return ApiResponse.success(roomService.getRoomsByWard(ward),  "Get rooms by ward successfully");
    }

    @GetMapping("/status/{status}")
    public ApiResponse<List<Room>> getByStatus(@PathVariable String status) {
        return ApiResponse.success(roomService.getRoomsByStatus(status), "Get rooms by status successfully");
    }

    @GetMapping("/area/{area}")
    public ApiResponse<List<Room>> getByMinArea(@PathVariable double area) {
        return ApiResponse.success(roomService.getRoomsByMinArea(area),  "Get rooms by area successfully");
    }

    @GetMapping("/price")
    public ApiResponse<List<Room>> getByPriceRange(
            @RequestParam double start,
            @RequestParam double end
    ) {
        return ApiResponse.success(roomService.getRoomsByPriceRange(start, end),  "Get rooms by price range successfully");
    }

    // ===========================
    //         CREATE
    // ===========================

    @PostMapping
    public ApiResponse<?> create(@RequestBody CreateRoomRequest request) {
        Room room = RoomMapper.toRoom(request);
        roomService.createRoom(room);

        return ApiResponse.success(true,"Create room successfully");
    }

    // ===========================
    //         UPDATE
    // ===========================

    @PutMapping("/{id}")
    public ApiResponse<?> update(
            @PathVariable String id,
            @RequestBody UpdateRoomRequest request
    ) {
        roomService.updateRoom(id, request);
        return ApiResponse.success(true,"Room updated");
    }

    // ===========================
    //         DELETE
    // ===========================

    @DeleteMapping("/{id}")
    public ApiResponse<?> delete(@PathVariable String id) {
        roomService.deleteRoom(id);
        return ApiResponse.success(true, "Room deleted");
    }
}

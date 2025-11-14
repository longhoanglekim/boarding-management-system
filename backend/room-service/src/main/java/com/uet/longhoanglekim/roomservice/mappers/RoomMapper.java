package com.uet.longhoanglekim.roomservice.mappers;

import com.uet.longhoanglekim.roomservice.dto.request.CreateRoomRequest;
import com.uet.longhoanglekim.roomservice.dto.response.RoomInfoDTO;
import com.uet.longhoanglekim.roomservice.model.Room;

public class RoomMapper {
    public static RoomInfoDTO toRoomInfoDTO(Room room) {
        RoomInfoDTO roomInfoDTO = new RoomInfoDTO();
        roomInfoDTO.setArea(room.getArea());
        roomInfoDTO.setDescription(room.getDescription());
        roomInfoDTO.setFeature(room.getFeature());
        roomInfoDTO.setImages(room.getImages());
        roomInfoDTO.setLocation(room.getLocation());
        roomInfoDTO.setStatus(room.getStatus());
        roomInfoDTO.setTitle(room.getTitle());
        roomInfoDTO.setOwnerId(room.getOwnerId());
        return roomInfoDTO;
    }

    public static Room toRoom(CreateRoomRequest roomInfo) {
        Room room = new Room();
        room.setArea(roomInfo.getArea());
        room.setDescription(roomInfo.getDescription());
        room.setFeature(roomInfo.getFeature());
        room.setImages(roomInfo.getImages());
        room.setLocation(roomInfo.getLocation());
        room.setStatus(roomInfo.getStatus());
        room.setTitle(roomInfo.getTitle());
        room.setOwnerId(roomInfo.getOwnerId());
        return room;
    }

}

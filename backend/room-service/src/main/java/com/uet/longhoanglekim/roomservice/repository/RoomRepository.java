package com.uet.longhoanglekim.roomservice.repository;

import com.uet.longhoanglekim.roomservice.model.Room;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;
public interface RoomRepository extends MongoRepository<Room, String> {
    Optional<Room> findById(String id);
    List<Room> findByLocation_city(String city);
    List<Room> findByLocation_ward(String ward);
    List<Room> findByStatus(String status);
    List<Room> findByAreaGreaterThanEqual(double area);
    List<Room> findByFeature_basePriceBetween(double startPrice, double endPrice);
}

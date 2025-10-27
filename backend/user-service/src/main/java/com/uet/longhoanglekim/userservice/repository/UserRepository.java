package com.uet.longhoanglekim.userservice.repository;

import com.uet.longhoanglekim.userservice.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserProfile, Long> {
    public UserProfile findById(long id);
}

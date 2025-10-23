package com.uet.longhoanglekim.authservice;

import com.uet.longhoanglekim.authservice.constant.Provider;
import com.uet.longhoanglekim.authservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByProviderAndProviderUserId(Provider provider, String providerUserId);
}

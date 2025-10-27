package com.uet.longhoanglekim.userservice.service;

import com.uet.longhoanglekim.userservice.dto.ProfileInfoDTO;
import com.uet.longhoanglekim.userservice.message.CreateProfileMessage;

public interface UserService {
    boolean createUserProfile(CreateProfileMessage createProfileMessage);

    boolean updateUserProfile(ProfileInfoDTO profileInfoDTO);
}

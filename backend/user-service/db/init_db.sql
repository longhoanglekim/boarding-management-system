DROP DATABASE IF EXISTS user_db;
CREATE DATABASE IF NOT EXISTS user_db
CHARACTER SET utf8mb4;

USE user_db;

CREATE TABLE user_profiles (
                               id BIGINT AUTO_INCREMENT PRIMARY KEY,
                               user_id BIGINT NOT NULL UNIQUE,
                               full_name VARCHAR(100),
                               phone_number VARCHAR(20),
                               avatar_url VARCHAR(255),
                               gender ENUM('MALE', 'FEMALE'),
                               date_of_birth DATE,
                               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                               updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Tạo database
DROP DATABASE IF EXISTS auth_db;
CREATE DATABASE IF NOT EXISTS auth_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE auth_db;

-- Tạo bảng users
CREATE TABLE users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       email VARCHAR(100) UNIQUE,
                       password VARCHAR(255),
                       role ENUM('ADMIN', 'OWNER', 'TENTANT') DEFAULT 'TENTANT',
                       provider ENUM('LOCAL', 'GMAIL', 'FACEBOOK') NOT NULL,
                       provider_user_id VARCHAR(255),
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                       is_active BOOLEAN DEFAULT FALSE,
                       UNIQUE KEY unique_provider_user (provider, provider_user_id)
);

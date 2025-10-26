DROP DATABASE IF EXISTS notification_db;
CREATE DATABASE IF NOT EXISTS notification_db;
USE notification_db;

CREATE TABLE notifications (
                               id BIGINT PRIMARY KEY AUTO_INCREMENT,
                               sender_id BIGINT NULL,
                               title VARCHAR(255) NOT NULL,
                               content TEXT NOT NULL,
                               channel ENUM('IN_APP', 'EMAIL', 'PUSH') DEFAULT 'IN_APP',
                               target_type ENUM('USER', 'ALL') DEFAULT 'USER',
                               created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE notification_recipients (
                                         id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                         notification_id BIGINT NOT NULL,
                                         receiver_id BIGINT NOT NULL,
                                         is_read BOOLEAN DEFAULT FALSE,
                                         read_at DATETIME NULL
);

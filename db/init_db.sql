
CREATE DATABASE IF NOT EXISTS boarding_house CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE boarding_house;

CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    role ENUM('TENANT', 'OWNER', 'ADMIN') DEFAULT 'TENANT',
    wallet_address VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cities (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE wards (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    city_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    FOREIGN KEY (city_id) REFERENCES cities(id)
);

CREATE TABLE rooms (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    owner_id BIGINT NOT NULL,
    ward_id BIGINT NOT NULL,
    title VARCHAR(255),
    description TEXT,
    address_detail VARCHAR(255),
    latitude DECIMAL(10,6),
    longitude DECIMAL(10,6),
    area FLOAT,
    status ENUM('AVAILABLE', 'RENTED', 'MAINTENANCE') DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id),
    FOREIGN KEY (ward_id) REFERENCES wards(id)
);

CREATE TABLE room_features (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    room_id BIGINT NOT NULL,
    base_price DECIMAL(12,2),
    electricity_price DECIMAL(10,2),
    water_price DECIMAL(10,2),
    service_price DECIMAL(10,2),
    has_air_conditioner BOOLEAN DEFAULT FALSE,
    has_washing_machine BOOLEAN DEFAULT FALSE,
    has_parking BOOLEAN DEFAULT FALSE,
    has_kitchen BOOLEAN DEFAULT FALSE,
    has_balcony BOOLEAN DEFAULT FALSE,
    has_pet_allowed BOOLEAN DEFAULT FALSE,
    has_dishwasher BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

CREATE TABLE room_images (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    room_id BIGINT NOT NULL,
    image_url TEXT NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

CREATE TABLE contracts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    tenant_id BIGINT NOT NULL,
    room_id BIGINT NOT NULL,
    token_id VARCHAR(100), -- có thể kết nối đến blockchain
    start_date DATE,
    end_date DATE,
    status ENUM('ACTIVE', 'ENDED', 'CANCELLED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES users(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

CREATE TABLE bills (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    contract_id BIGINT NOT NULL,
    bill_type ENUM('RENT', 'ELECTRICITY', 'WATER', 'SERVICE') NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    billing_month TINYINT CHECK (billing_month BETWEEN 1 AND 12),
    billing_year SMALLINT,
    due_date DATE,                              -- hạn thanh toán (tùy chọn)
    is_paid BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contract_id) REFERENCES contracts(id)
);


CREATE TABLE maintenance_requests (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    contract_id BIGINT NOT NULL,
    title VARCHAR(255),
    description TEXT,
    status ENUM('PENDING', 'IN_PROGRESS', 'DONE') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contract_id) REFERENCES contracts(id)
);

-- 1. INSERT 34 tỉnh / thành phố mới với id rõ ràng
INSERT INTO cities (id, name) VALUES
  (1, 'Thành phố Hà Nội'),(2, 'Bắc Ninh'),(3, 'Quảng Ninh'),(4, 'Thành phố Hải Phòng'),(5, 'Hưng Yên'),
  (6, 'Ninh Bình'),(7, 'Cao Bằng'),(8, 'Tuyên Quang'),(9, 'Lào Cai'),(10, 'Thái Nguyên'),
  (11, 'Lạng Sơn'),(12, 'Phú Thọ'),(13, 'Điện Biên'),(14, 'Lai Châu'),(15, 'Sơn La'),
  (16, 'Thanh Hóa'),(17, 'Nghệ An'),(18, 'Hà Tĩnh'),(19, 'Quảng Trị'),(20, 'Thành phố Huế'),
  (21, 'Thành phố Đà Nẵng'),(22, 'Quảng Ngãi'),(23, 'Khánh Hòa'),(24, 'Gia Lai'),(25, 'Đắk Lắk'),
  (26, 'Lâm Đồng'),(27, 'Tây Ninh'),(28, 'Đồng Nai'),(29, 'Thành phố Hồ Chí Minh'),(30, 'Vĩnh Long'),
  (31, 'Đồng Tháp'),(32, 'An Giang'),(33, 'Thành phố Cần Thơ'),(34, 'Cà Mau');  -- nếu bạn có tỉnh/phần bổ sung, hoặc bạn có thể bỏ dòng “Khác”

-- 2. INSERT 126 xã / phường cho Hà Nội (city_id = 1)
-- Danh sách 126 xã / phường mới của Hà Nội (51 phường + 75 xã)  
-- (theo danh sách công bố) :contentReference[oaicite:0]{index=0}

INSERT INTO wards (city_id, name) VALUES
  (1, 'Phường Hoàn Kiếm'),(1, 'Phường Cửa Nam'),(1, 'Phường Ba Đình'), (1, 'Phường Ngọc Hà'),(1, 'Phường Giảng Võ'),(1, 'Phường Hai Bà Trưng'),
  (1, 'Phường Vĩnh Tuy'),(1, 'Phường Bạch Mai'),(1, 'Phường Đống Đa'),(1, 'Phường Kim Liên'),(1, 'Phường Văn Miếu ‒ Quốc Tử Giám'),
  (1, 'Phường Láng'),(1, 'Phường Ô Chợ Dừa'),(1, 'Phường Hồng Hà'),(1, 'Phường Lĩnh Nam'),(1, 'Phường Hoàng Mai'),(1, 'Phường Vĩnh Hưng'),
  (1, 'Phường Tương Mai'),(1, 'Phường Định Công'),(1, 'Phường Hoàng Liệt'),(1, 'Phường Yên Sở'),(1, 'Phường Thanh Xuân'),(1, 'Phường Khương Đình'),
  (1, 'Phường Phương Liệt'),(1, 'Phường Cầu Giấy'),(1, 'Phường Nghĩa Đô'),(1, 'Phường Yên Hòa'),
  (1, 'Phường Tây Hồ'),(1, 'Phường Phú Thượng'),(1, 'Phường Tây Tựu'),(1, 'Phường Phú Diễn'),(1, 'Phường Xuân Đỉnh'),(1, 'Phường Đông Ngạc'),
  (1, 'Phường Thượng Cát'), (1, 'Phường Từ Liêm'),(1, 'Phường Xuân Phương'),(1, 'Phường Tây Mỗ'),(1, 'Phường Đại Mỗ'),(1, 'Phường Long Biên'),
  (1, 'Phường Bồ Đề'),(1, 'Phường Việt Hưng'),(1, 'Phường Phúc Lợi'),(1, 'Phường Hà Đông'),(1, 'Phường Dương Nội'),(1, 'Phường Yên Nghĩa'),
  (1, 'Phường Phú Lương'),(1, 'Phường Kiến Hưng'),(1, 'Phường Thanh Liệt'),(1, 'Xã Tả Thanh Oai'),(1, 'Xã Tam Hưng'),(1, 'Xã Vân Hòa'),
  (1, 'Xã Vân Từ'),(1, 'Xã Hòa Bình'),(1, 'Xã Hưng Chính'),(1, 'Xã Duyên Hà'),(1, 'Xã Kim Xá'),(1, 'Xã Kim Lũ'),
  (1, 'Xã Kim Thái'),(1, 'Xã Lê Thanh Mai'), (1, 'Xã Liên Phương'),(1, 'Xã Lưu Vệ'),(1, 'Xã Mai Dịch'),(1, 'Xã Minh Khai'),(1, 'Xã Mỹ Đức'),
  (1, 'Xã Nam Phú'),(1, 'Xã Ngọc Hồi'),(1, 'Xã Thượng Phúc'),(1, 'Xã Thường Tín'),(1, 'Xã Chương Dương'),(1, 'Xã Hồng Vân'),(1, 'Xã Phú Xuyên'),
  (1, 'Xã Phượng Dực'),(1, 'Xã Chuyên Mỹ'),(1, 'Xã Đại Xuyên'),(1, 'Xã Thanh Oai'),(1, 'Xã Bình Minh'),(1, 'Xã Dân Hòa'),
  (1, 'Xã Ứng Thiên'),(1, 'Xã Hòa Xá'),(1, 'Xã Ứng Hòa'),(1, 'Xã Hồng Sơn'),(1, 'Xã Phúc Sơn'),(1, 'Xã Hương Sơn'),(1, 'Xã Phú Nghĩa'),
  (1, 'Xã Xuân Mai'),(1, 'Xã Trần Phú'),(1, 'Xã Hòa Phú'),(1, 'Xã Quảng Bị'),(1, 'Xã Minh Châu'),(1, 'Xã Quảng Oai'), (1, 'Xã Vật Lại'),
  (1, 'Xã Cổ Đô'),(1, 'Xã Bất Bạt'),(1, 'Xã Suối Hai'),(1, 'Xã Ba Vì'),(1, 'Xã Yên Bài'),(1, 'Xã Đoài Phương'),(1, 'Xã Phúc Thọ'),
  (1, 'Xã Phúc Lộc'),(1, 'Xã Hát Môn'),(1, 'Xã Thạch Thất'),(1, 'Xã Hạ Bằng'),(1, 'Xã Tây Phương'),(1, 'Xã Hòa Lạc'),(1, 'Xã Yên Xuân'),
  (1, 'Xã Quốc Oai'),(1, 'Xã Hưng Đạo'),(1, 'Xã Kiều Phú'),(1, 'Xã Phú Cát'),(1, 'Xã Hoài Đức'),(1, 'Xã Dương Hòa'), (1, 'Xã Sơn Đồng'),
  (1, 'Xã An Khánh'),(1, 'Xã Đan Phượng'),(1, 'Xã Ô Diên'),(1, 'Xã Liên Minh'),(1, 'Xã Gia Lâm'),(1, 'Xã Thuận An'),(1, 'Xã Bát Tràng'),
  (1, 'Xã Phù Đổng'),(1, 'Xã Thư Lâm'),(1, 'Xã Đông Anh'),(1, 'Xã Phúc Thịnh'),(1, 'Xã Thiên Lộc'),(1, 'Xã Vĩnh Thanh'),
  (1, 'Xã Mê Linh'),(1, 'Xã Yên Lãng'),(1, 'Xã Tiến Thắng'),(1, 'Xã Quang Minh'),(1, 'Xã Sóc Sơn'),(1, 'Xã Đa Phúc'),(1, 'Xã Nội Bài'),(1, 'Xã Trung Giã'),
  (1, 'Xã Kim Anh');

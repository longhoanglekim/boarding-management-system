package com.example.contractservice.config;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EnvConfig {

    @PostConstruct
    public void loadEnv() {
        Dotenv dotenv = Dotenv.configure()
                .directory("./")        // root project
                .filename(".env")       // tên file
                .ignoreIfMissing()      // không lỗi nếu không có file
                .load();

        // Đẩy tất cả biến trong .env vào System properties để Spring đọc được
        dotenv.entries().forEach(entry ->
                System.setProperty(entry.getKey(), entry.getValue())
        );

        System.out.println("Loaded .env file successfully!");
    }
    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.load();

        // Đẩy tất cả biến trong .env vào System properties để Spring đọc được
        dotenv.entries().forEach(entry -> {
            System.out.println(entry.getKey() + " = " + entry.getValue());
            System.setProperty(entry.getKey(), entry.getValue());
                }

        );
        if (dotenv.entries().isEmpty()) {
            System.out.println("No .env file found!");
        }

        System.out.println("Loaded .env file successfully!");
        System.out.println("=== ĐÃ LOAD .ENV THÀNH CÔNG ===");
        System.out.println("ACCOUNT_ADDRESS = " + System.getProperty("ACCOUNT_ADDRESS"));
        System.out.println("PRIVATE_KEY = " + (System.getProperty("PRIVATE_KEY") != null ? "ĐÃ LOAD (ẩn để an toàn)" : "NULL"));
        System.out.println("SEPOLIA_RPC_URL = " + System.getProperty("SEPOLIA_RPC_URL"));
        System.out.println("Số biến load được: " + dotenv.entries().size());
        System.out.println("=====================================");
    }
}
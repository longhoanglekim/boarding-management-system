package com.uet.longhoanglekim.notificationservice.config;

import com.uet.longhoanglekim.notificationservice.message.RegisterMessage;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

@EnableKafka
@Configuration
public class KafkaConsumerConfig {

    @Bean
    public ConsumerFactory<String, RegisterMessage> registerConsumerFactory() {
        // 1. Khởi tạo JsonDeserializer CỦA BẠN và cấu hình nó
        JsonDeserializer<RegisterMessage> jsonDeserializer = new JsonDeserializer<>(RegisterMessage.class, false);
        // Thiết lập trusted packages để giải mã đối tượng từ JSON (RẤT QUAN TRỌNG)
        // Bạn có thể dùng tên package cụ thể hoặc "*" để tin tưởng tất cả
        jsonDeserializer.addTrustedPackages("*");

        // 2. Cấu hình các thuộc tính Consumer
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "notification-group");

        // KHÔNG CẦN định nghĩa Deserializer Class ở đây nữa, vì chúng ta sẽ cung cấp
        // các đối tượng Deserializer đã được tạo bên dưới

        return new DefaultKafkaConsumerFactory<>(
                props,
                new StringDeserializer(), // Key Deserializer
                jsonDeserializer          // Value Deserializer đã được cấu hình
        );
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, RegisterMessage> registerKafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, RegisterMessage> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(registerConsumerFactory());

        // Bạn có thể thêm cấu hình Error Handler ở đây nếu muốn tùy chỉnh lỗi
        // factory.setCommonErrorHandler(new DefaultErrorHandler(new FixedBackOff(1000L, 2L)));

        return factory;
    }
}
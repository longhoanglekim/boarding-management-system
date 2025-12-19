package com.uet.longhoanglekim.authservice.config;


import com.uet.longhoanglekim.authservice.message.CreateProfileMessage;
import com.uet.longhoanglekim.authservice.message.EmailRegisterMessage;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaProducerConfig {

    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    // Tạo ProducerFactory chung (default) - type Object để dùng chung cho mọi message type
    @Bean
    public ProducerFactory<String, Object> producerFactory() {
        Map<String, Object> props = new HashMap<>();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        // Có thể thêm các config khác: acks, retries, batch size...
        return new DefaultKafkaProducerFactory<>(props);
    }

    // KafkaTemplate chung (có thể dùng cho mọi message)
    @Bean
    public KafkaTemplate<String, Object> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }

    // Producer chuyên biệt cho EmailRegisterMessage - reuse config từ producerFactory chung
    @Bean
    public ProducerFactory<String, EmailRegisterMessage> emailRegisterProducerFactory() {
        return new DefaultKafkaProducerFactory<>(producerFactory().getConfigurationProperties());
    }

    @Bean
    public KafkaTemplate<String, EmailRegisterMessage> emailRegisterMessageKafkaTemplate() {
        return new KafkaTemplate<>(emailRegisterProducerFactory());
    }

    // Producer chuyên biệt cho CreateProfileMessage
    @Bean
    public ProducerFactory<String, CreateProfileMessage> createProfileProducerFactory() {
        return new DefaultKafkaProducerFactory<>(producerFactory().getConfigurationProperties());
    }

    @Bean
    public KafkaTemplate<String, CreateProfileMessage> createProfileMessageKafkaTemplate() {
        return new KafkaTemplate<>(createProfileProducerFactory());
    }
}
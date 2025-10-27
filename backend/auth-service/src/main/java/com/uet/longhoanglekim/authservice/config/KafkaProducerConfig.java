package com.uet.longhoanglekim.authservice.config;


import com.uet.longhoanglekim.authservice.message.CreateProfileMessage;
import com.uet.longhoanglekim.authservice.message.EmailRegisterMessage;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
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

    @Bean
    public ProducerFactory<String, EmailRegisterMessage> emailRegisterProducerFactory() {
        return new DefaultKafkaProducerFactory<>(commonProps());
    }

    @Bean
    public KafkaTemplate<String, EmailRegisterMessage> emailRegisterMessageKafkaTemplate() {
        return new KafkaTemplate<>(emailRegisterProducerFactory());
    }

    @Bean
    public ProducerFactory<String, CreateProfileMessage> createProfileProducerFactory() {
        return new DefaultKafkaProducerFactory<>(commonProps());
    }

    @Bean
    public KafkaTemplate<String, CreateProfileMessage> createProfileMessageKafkaTemplate() {
        return new KafkaTemplate<>(createProfileProducerFactory());
    }


    private Map<String, Object> commonProps() {
        Map<String, Object> props = new HashMap<>();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        props.put(JsonSerializer.ADD_TYPE_INFO_HEADERS, false);
        return props;
    }
}


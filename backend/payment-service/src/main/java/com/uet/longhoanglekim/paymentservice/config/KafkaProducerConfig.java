package com.uet.longhoanglekim.paymentservice.config;


import com.uet.longhoanglekim.paymentservice.message.CreateInvoiceMessage;
import com.uet.longhoanglekim.paymentservice.message.TransactionProcessMessage;
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
    public ProducerFactory<String, CreateInvoiceMessage> createInvoiceProducerFactory() {
        return new DefaultKafkaProducerFactory<>(commonProps());
    }

    @Bean
    public KafkaTemplate<String, CreateInvoiceMessage> createInvoiceMessageKafkaTemplate() {
        return new KafkaTemplate<>(createInvoiceProducerFactory());
    }

    @Bean
    public ProducerFactory<String, TransactionProcessMessage> transactionProcessMessageProducerFactory() {
        return new DefaultKafkaProducerFactory<>(commonProps());
    }

    @Bean
    public KafkaTemplate<String, TransactionProcessMessage> transactionProcessMessageKafkaTemplate() {
        return new KafkaTemplate<>(transactionProcessMessageProducerFactory());
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
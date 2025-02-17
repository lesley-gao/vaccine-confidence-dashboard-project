package org.uoa.vaccinesafetyconfidence.service;

import org.apache.kafka.clients.consumer.ConsumerRecord;

public interface KafkaListenerService {

    void vaccineListener(ConsumerRecord<String, String> record);

}

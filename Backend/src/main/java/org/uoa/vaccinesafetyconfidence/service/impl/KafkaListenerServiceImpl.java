package org.uoa.vaccinesafetyconfidence.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.uoa.vaccinesafetyconfidence.mapper.UserAccountMapper;
import org.uoa.vaccinesafetyconfidence.pojo.entity.UserAccount;
import org.uoa.vaccinesafetyconfidence.service.EmailService;
import org.uoa.vaccinesafetyconfidence.service.KafkaListenerService;

import java.util.List;


@Service
@Slf4j
public class KafkaListenerServiceImpl implements KafkaListenerService {

    @Autowired
    private UserAccountMapper userAccountMapper;

    @Autowired
    private EmailService emailService;

    private final ObjectMapper objectMapper = new ObjectMapper();


//    @KafkaListener(topics = "dbserver1.miles_vax_confidence_test.USER_ACCOUNT_T", groupId = "email-notification-group") // Kafka 主题名（格式为 serverName.database.table）
//    public void consume(ConsumerRecord<String, String> record) {
//
//
//        String message = record.value();
//        if (message == null || message.isEmpty()) {
//            System.out.println("🗑️ Tombstone message received for key: " + record.key());
//            return;
//        }
//
//        try {
//            JsonNode payload = objectMapper.readTree(message).get("payload");
//            JsonNode before = payload.get("before");
//            JsonNode after = payload.get("after");
//            String operation = payload.get("op").asText();
//            System.out.println("操作类型：" + operation);
//            System.out.println("更新前：" + before);
//            System.out.println("更新后：" + after);
//
//        } catch (JsonProcessingException e) {
//            System.err.println("❌ JSON 解析失败: " + message);
//            e.printStackTrace();
//        }
//
//    }

//    @KafkaListener(topics = "dbserver1.miles_vax_confidence_test.USER_SUBSCRIPTION_T", groupId = "email-notification-group")
//    public void testListener(ConsumerRecord<String, String> record) {
//        String message = record.value();
//        if (message == null || message.isEmpty()){
//            log.info("Tombstone message received for key: " + record.key());
//            return;
//        }
//
//        try {
//            JsonNode payload = objectMapper.readTree(message).get("payload");
//            JsonNode before = payload.get("before");
//            JsonNode after = payload.get("after");
//            String operation = payload.get("op").asText();
//
//            if (operation.matches("u"))
//                System.out.println("接收到更新操作");
//
//            if (operation.matches("c"))
//                System.out.println("接收到新建操作");
//
//            if (operation.matches("d"))
//                System.out.println("接收到删除操作");
//
//
//            System.out.println("操作类型：" + operation);
//            System.out.println("更新前：" + before);
//            System.out.println("更新后：" + after);
//
//        } catch (JsonProcessingException e) {
//            System.err.println("❌ JSON 解析失败: " + message);
//            e.printStackTrace();
//        }
//
//    }

    @Override
    @KafkaListener(topics = "dbserver1.miles_vax_confidence.VACCINE_T", groupId = "email-notification-group")
    public void vaccineListener(ConsumerRecord<String, String> record) {
        String message = record.value();
        if (message == null || message.isEmpty()){
//            throw new BusinessException("Debezium tombstone message received for key: " + record.key(), ResponseEnum.DEBEZIUM_TOMBSTONE_MESSAGE.getCode());   // 抛出异常会导致kafka不断尝试
            log.info("Debezium tombstone message received for key: " + record.key());
            return;
        }

        try {
            JsonNode payload = objectMapper.readTree(message).get("payload");
            String operation = payload.get("op").asText();

            if (operation.matches("u")){

                JsonNode vacEfficacyBefore = payload.get("before").get("vac_efficacy");
                JsonNode vacEfficacyAfter = payload.get("after").get("vac_efficacy");

                if (!vacEfficacyBefore.equals(vacEfficacyAfter)){
                    log.info("Vaccine Efficacy in database changed.");
                    Integer vacId = payload.get("after").get("vac_id_pk").asInt();
                    LambdaQueryWrapper<UserAccount> queryWrapper = new LambdaQueryWrapper<>();
                    queryWrapper.inSql(UserAccount::getUserUidPk,
                            "SELECT `user_uid_pk` FROM `USER_SUBSCRIPTION_T` WHERE `vac_id_pk` = " + vacId
                    );
                    queryWrapper.select(UserAccount::getUserEmail);

                    List<UserAccount> userAccountList = userAccountMapper.selectList(queryWrapper);

                    for (UserAccount userAccount : userAccountList) {
//                        emailService.sendEmail(
//                                userAccount.getUserEmail(),
//                                "The vaccine you subscribed to on the VaccineView platform has been updated",
//                                payload.get("after").get("vac_type") + " Vaccine Efficacy changes from: \n" + vacEfficacyBefore + "\nchanged to: \n" + vacEfficacyAfter
//                        );
                        emailService.sendEmail(
                                userAccount.getUserEmail(),
                                "The vaccine you subscribed to on the VaccineView platform has been updated",
                                payload.get("after").get("vac_type") + " Vaccine Efficacy has changed. You can go to VaccineView Dashboard to check the details."
                        );
                    }
                }

            }

        } catch (JsonProcessingException e) {
            System.err.println("❌ JSON 解析失败: " + message);
            e.printStackTrace();
        }


    }



}

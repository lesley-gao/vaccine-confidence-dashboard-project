package org.uoa.vaccinesafetyconfidence.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;
import org.uoa.vaccinesafetyconfidence.exception.BusinessException;
import org.uoa.vaccinesafetyconfidence.service.EmailService;

import org.springframework.mail.MailSendException;


@Service
@Slf4j
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Async // 异步执行
    public void sendEmail(String emailAddress, String subject, String text) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(emailAddress);
            helper.setSubject(subject);
            helper.setText(text, true);
            javaMailSender.send(message);
        } catch (MailSendException e){
            log.error("目标邮箱不存在");
            throw new BusinessException(e.getMessage());
        } catch (Exception e) {
            log.error("文本邮件发送异常！", e);
            throw new BusinessException(e.getMessage());
        }
    }

}

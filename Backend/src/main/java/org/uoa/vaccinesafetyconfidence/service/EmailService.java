package org.uoa.vaccinesafetyconfidence.service;

import java.util.List;

public interface EmailService {
    void sendEmail(String emailAddress, String subject, String text);
}

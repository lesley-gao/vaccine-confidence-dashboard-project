package org.uoa.vaccinesafetyconfidence.service;

import org.uoa.vaccinesafetyconfidence.pojo.entity.Vaccine;

import java.util.List;


public interface UserService {
    void putASubscription(String token, Integer vaccineId);

    List<Vaccine> getUserSubscriptions(String token);

    void deleteASubscription(String token, Integer vaccineId);

}

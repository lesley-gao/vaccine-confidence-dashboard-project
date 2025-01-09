package org.uoa.vaccinesafetyconfidence.service;

import org.uoa.vaccinesafetyconfidence.pojo.entity.HealthProvider;

import java.util.List;

public interface HealthProviderService {

    List<HealthProvider> getHealthProviders(Integer vaccineId);

}

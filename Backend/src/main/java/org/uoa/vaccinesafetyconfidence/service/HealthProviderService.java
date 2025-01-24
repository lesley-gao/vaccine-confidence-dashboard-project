package org.uoa.vaccinesafetyconfidence.service;

import org.uoa.vaccinesafetyconfidence.pojo.entity.HealthProvider;

import java.util.List;

public interface HealthProviderService {
    List<HealthProvider> searchHealthProvidersById(Integer vaccineId);

    List<HealthProvider> getAllHealthProviders();

    List<HealthProvider> searchHealthProvidersByType(String healthProviderType);

    List<String> getHealthProviderTypes();

}

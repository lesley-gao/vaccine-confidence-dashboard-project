package org.uoa.vaccinesafetyconfidence.service;

import org.uoa.vaccinesafetyconfidence.pojo.entity.ComponentDataSource;

import java.util.List;

public interface FrontendComponentService {
    List<ComponentDataSource> getComponentDataSourceById(String componentId);

    List<ComponentDataSource> getAComponentDataSource();

}

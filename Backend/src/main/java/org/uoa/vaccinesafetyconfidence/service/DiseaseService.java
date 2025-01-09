package org.uoa.vaccinesafetyconfidence.service;

import org.uoa.vaccinesafetyconfidence.pojo.dto.DiseaseInfosDTO;

import java.util.List;

public interface DiseaseService {

    List<DiseaseInfosDTO> getDisease(Integer vaccineId);
}

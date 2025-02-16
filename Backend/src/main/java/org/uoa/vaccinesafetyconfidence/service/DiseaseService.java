package org.uoa.vaccinesafetyconfidence.service;

import org.uoa.vaccinesafetyconfidence.pojo.dto.DiseaseInfosDTO;
import org.uoa.vaccinesafetyconfidence.pojo.entity.DiseaOutbreakTimeline;
import org.uoa.vaccinesafetyconfidence.pojo.entity.DiseaseR0;

import java.util.List;

public interface DiseaseService {

    List<DiseaseInfosDTO> getDisease(Integer vaccineId);

    List<DiseaOutbreakTimeline> getDiseaOutbreakTimelineByDiseaId(Integer diseaId);

    List<DiseaseR0> getDiseaR0ByDiseaId(Integer diseaId);

}

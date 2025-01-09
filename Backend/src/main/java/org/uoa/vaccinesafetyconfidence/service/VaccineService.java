package org.uoa.vaccinesafetyconfidence.service;

import org.uoa.vaccinesafetyconfidence.pojo.dto.VaccineDoseCoverageRateDTO;
import org.uoa.vaccinesafetyconfidence.pojo.entity.Vaccine;
import org.uoa.vaccinesafetyconfidence.pojo.vo.VacDevelopmentMilestoneVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.VaccineVO;

import java.util.List;

public interface VaccineService {

    List<VaccineVO> getAllExistingVaccines();


    Vaccine searchVaccineById(Integer vaccineId);

    String  getVaccineEfficacyById(Integer vaccineId);

    String getVaccineAllInfoById(Integer vaccineId);


    List<VaccineDoseCoverageRateDTO> getVaccineDoseCoverageRate(Integer vaccineId);

    List<VacDevelopmentMilestoneVO> getVacDevMilestone(Integer vaccineId);

}

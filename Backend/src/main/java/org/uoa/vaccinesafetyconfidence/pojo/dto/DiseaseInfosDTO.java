package org.uoa.vaccinesafetyconfidence.pojo.dto;

import lombok.Data;
import org.uoa.vaccinesafetyconfidence.pojo.entity.Disease;
import org.uoa.vaccinesafetyconfidence.pojo.vo.DiseaAnnualCaseVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.DiseaIncidenceRateVO;

import java.util.List;

@Data
public class DiseaseInfosDTO {

    protected Disease disease;

    protected List<DiseaIncidenceRateVO> diseaIncidenceRateVOList;

    protected List<DiseaAnnualCaseVO> diseaAnnualCaseVOList;

}

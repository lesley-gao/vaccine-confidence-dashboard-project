package org.uoa.vaccinesafetyconfidence.pojo.dto;

import lombok.Data;
import org.uoa.vaccinesafetyconfidence.pojo.vo.VacCoverageRateVO;

import java.util.List;

@Data
public class VaccineDoseCoverageRateDTO {

    protected Integer vdIdPk;

    protected String vdName;

    protected List<VacCoverageRateVO> vacCoverageRateVOList;


}

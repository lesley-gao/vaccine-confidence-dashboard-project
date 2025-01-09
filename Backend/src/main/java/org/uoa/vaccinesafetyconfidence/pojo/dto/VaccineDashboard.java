package org.uoa.vaccinesafetyconfidence.pojo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.uoa.vaccinesafetyconfidence.pojo.entity.Disease;

import java.util.List;

@Data
public class VaccineDashboard {

    @Schema(description = "疫苗名称")
    protected String vacType;

    protected String vacEfficacy;

    protected Integer vacSevereCases;

    protected List<Disease> diseaseList;

}

package org.uoa.vaccinesafetyconfidence.pojo.vo;

import lombok.Data;

@Data
public class VaccineVO {


    private Integer vacId;

    private String vacType;
    private String vacEfficacy;
    private Integer vacSevereCases;
}

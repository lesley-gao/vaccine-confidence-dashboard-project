package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("DISEASE_VACCINE_T")
@Data
public class DiseaseVaccine {

    private Integer diseaIdPk;

    private Integer vacIdPk;


}

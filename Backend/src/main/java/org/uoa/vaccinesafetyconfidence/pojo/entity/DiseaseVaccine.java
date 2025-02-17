package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("DISEASE_VACCINE_T")
@Data
public class DiseaseVaccine {

    @TableId(value = "disea_id_pk")
    private Integer diseaIdPk;

    private Integer vacIdPk;


}

package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("`VCI_SURVEY_DETAILED_T`")
public class VCISurveyDetailed {

    @TableId(value = "vsd_id_pk", type = IdType.AUTO)
    private Integer vsdIdPk;

    private String vsdCountryCode;

    private Integer vsdYear;

    private String vsdDemographics;

    private String vsdDmgType;

    private float vsdChildren;

    private float vsdSafe;

    private float vsdEffective;

    private float vsdBeliefs;


}

package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("`VCI_SURVEY_GENERAL_T`")
public class VCISurveyGeneral {

    @TableId(value = "vsg_id_pk", type = IdType.AUTO)
    private Integer vsgIdPk;

    private String vsgCountry;

    private String vsgCountryCode;

    private Integer vsgYear;

    private float vsgChildren;

    private float vsgSafe;

    private float vsgEffective;

    private float vsgBeliefs;
}

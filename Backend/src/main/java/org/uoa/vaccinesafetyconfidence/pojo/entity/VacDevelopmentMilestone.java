package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("VAC_DEVELOPMENT_MILESTONE_T")
public class VacDevelopmentMilestone {

    @TableId(value = "vdm_id_pk", type = IdType.AUTO)
    private Integer vdmIdPk;

    private Integer vacIdPk;

    private Integer vdmYear;

    private String vdmDescription;


}

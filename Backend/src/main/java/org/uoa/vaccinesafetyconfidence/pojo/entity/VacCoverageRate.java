package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("VAC_COVERAGE_RATE_T")
public class VacCoverageRate {

    @TableId(value = "vcr_id_pk", type = IdType.AUTO)
    private Integer vcrIdPk;

    private Integer vdIdPk;

    private Integer vcrYear;

    private float vcrAnnualRate;


}

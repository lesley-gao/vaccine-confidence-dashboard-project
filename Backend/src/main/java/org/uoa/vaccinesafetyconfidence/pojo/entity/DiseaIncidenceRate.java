package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("`DISEA_INCIDENCE_RATE`")
public class DiseaIncidenceRate {

    @TableId(value = "dir_id_pk", type = IdType.AUTO)
    private Integer dirIdPk;

    private Integer diseaIdPk;

    private float dirRate;

    private Integer dirYear;

}

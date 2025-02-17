package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("`DISEA_ANNUAL_CASE`")
public class DiseaAnnualCase {

    @TableId(value = "dac_id_pk", type = IdType.AUTO)
    private Integer dirIdPk;

    private Integer diseaIdPk;

    private Integer dacNumbers;

    private Integer dacYear;


}

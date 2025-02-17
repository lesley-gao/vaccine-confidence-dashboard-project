package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("`VAC_DOSE_T`")
public class VacDose {

    @TableId(value = "vd_id_pk", type = IdType.AUTO)
    private Integer vdIdPK;

    @TableField(value = "vac_id_pk")
    private Integer vacIdPk;

    private String vdName;



}

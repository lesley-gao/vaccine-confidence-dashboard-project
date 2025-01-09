package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("DISEASE_T")
@Data
public class Disease {

    @TableId(value = "disea_id_pk", type = IdType.AUTO)
    private Integer diseaIdPk;

    private String diseaName;

    private String diseaMortalityRate;


}

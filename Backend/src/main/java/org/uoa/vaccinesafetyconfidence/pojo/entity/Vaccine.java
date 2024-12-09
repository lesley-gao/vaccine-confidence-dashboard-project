package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("`VACCINE_T`")
public class Vaccine {
    @TableId(value = "vac_id_pk", type = IdType.AUTO)
    private Integer vacId;
    private String vacType;
    private String vacEfficacy;
    private Integer vacSevereCases;

}

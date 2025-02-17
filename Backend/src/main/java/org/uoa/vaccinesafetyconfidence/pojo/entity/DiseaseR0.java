package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("`DISEASE_R0_T`")
public class DiseaseR0 {
    @TableId(type = IdType.AUTO)
    private Integer dr0IdPk; // The serial number of Vaccine (AUTO_INCREMENT)

    private Integer diseaIdPk; // The serial number of Disease

    private float dr0Min; // The lower bound of R0 (Numeric, size: 5,2)

    private float dr0Max; // The upper bound of R0 (Numeric, size: 5,2)

}

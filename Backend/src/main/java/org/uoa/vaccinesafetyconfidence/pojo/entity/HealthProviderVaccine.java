package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("`HEALTH_PROVIDER_VACCINE_T`")
@Data
public class HealthProviderVaccine {

    @TableId(value = "hp_uuid_pk")
    private String hpUuidPk;

    private Integer vacIdPk;
}

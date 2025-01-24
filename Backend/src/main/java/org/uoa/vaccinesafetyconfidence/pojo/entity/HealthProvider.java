package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("HEALTH_PROVIDER_T")
@Data
public class HealthProvider {

    @TableId(value = "hp_uuid_pk")
    private String hpUuidPk;

    @TableField(value = "hp_name")
    private String hpName;

    @TableField(value = "hp_address")
    private String hpAddress;

    @TableField(value = "hp_city")
    private String hpCity;

    @TableField(value = "hp_suburb")
    private String hpSuburb;

    @TableField(value = "hp_longitude")
    private double hpLongitude;

    @TableField(value = "hp_latitude")
    private double hpLatitude;

    @TableField(value = "hp_type")
    private String hpType;
}

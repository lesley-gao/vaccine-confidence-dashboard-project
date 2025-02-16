package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("`DISEA_OUTBREAK_TIMELINE`")
@Data
public class DiseaOutbreakTimeline {

    @TableId(type = IdType.AUTO)
    private Integer dotIdPk; // The serial number of Disease Outbreak Timeline

    private Integer diseaIdPk; // The serial number of Disease

    private Integer dotYear; // The year of Disease Outbreak

    private String dotDescription; // What happened in a specific year regarding the disease

}

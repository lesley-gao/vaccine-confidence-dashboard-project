package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("`COMPONENT_DATA_SOURCE_T`")
public class ComponentDataSource {

    @TableId(value = "cds_id_pk", type = IdType.AUTO)
    private Integer cdsIdPk;

    private Integer vacIdPk;

    private String cdsComponentId;

    private String cdsComponentName;

    private String cdsWebsiteName;

    private String cdsWebsiteUrl;

}

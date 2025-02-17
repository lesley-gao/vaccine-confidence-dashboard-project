package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;


@Data
@TableName("`USER_SUBSCRIPTION_T`")
@AllArgsConstructor
@NoArgsConstructor
public class UserSubscription {

    @TableId(value = "usc_id_pk",type = IdType.AUTO)
    private Long uscIdPk;

    @TableField(value = "user_uid_pk")
    private String userUidPk;

    @TableField(value = "vac_id_pk")
    private Integer vacIdPk;

    @TableField(value = "usc_time_created")
    private Timestamp uscTimeCreated;


    public UserSubscription(String userUid, Integer vacIdPk){
        this.userUidPk = userUid;
        this.vacIdPk = vacIdPk;
    }

}

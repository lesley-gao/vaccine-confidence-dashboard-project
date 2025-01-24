package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.sql.Timestamp;

@Data
@TableName("`USER_ACCOUNT_T`")
public class UserAccount {
    @TableId(value = "user_uid_pk")
    private String userUidPk;

    @TableField(value = "user_username")
    private String userUsername;

    private String userPassword;

    private String userEmail;

    private String userGoogleId;

    private String userAvatarPath;

    private String userFullName;

    private Integer userRole;

    private Timestamp userTimeCreated;

    private Timestamp userTimeUpdated;


}

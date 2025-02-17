package org.uoa.vaccinesafetyconfidence.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.sql.Timestamp;

@Data
@TableName("`USER_ACCOUNT_T`")
public class UserAccount {
    @TableId(value = "user_uid_pk", type = IdType.ASSIGN_ID)    // 雪花算法产生的32位ID
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

    private boolean userVerified;

    private String userVerificationCode;

}

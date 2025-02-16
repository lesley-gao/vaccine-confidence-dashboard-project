package org.uoa.vaccinesafetyconfidence.pojo.vo;

import lombok.Data;

@Data
public class RegisterVO {

    private String userUsername;

    private String userPassword;

    private String userEmail;

    private String userGoogleId;

    private String userAvatarPath;

    private String userFullName;

    private String verificationCode;

}

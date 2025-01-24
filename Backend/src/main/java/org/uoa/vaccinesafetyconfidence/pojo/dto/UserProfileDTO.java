package org.uoa.vaccinesafetyconfidence.pojo.dto;

import lombok.Data;


@Data
public class UserProfileDTO {

    protected String userUsername;

    protected String userEmail;

    protected String userAvatarPath;

    protected String userFullName;

}

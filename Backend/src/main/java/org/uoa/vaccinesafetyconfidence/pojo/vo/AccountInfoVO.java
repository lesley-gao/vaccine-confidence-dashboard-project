package org.uoa.vaccinesafetyconfidence.pojo.vo;

import lombok.Data;

@Data
public class AccountInfoVO {

//    @ApiModelProperty(value = "username")
    private String username;

    private Integer role;

    private String token;

    private String userUid;
}
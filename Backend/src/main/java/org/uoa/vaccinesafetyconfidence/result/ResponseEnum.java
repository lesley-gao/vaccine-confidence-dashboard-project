package org.uoa.vaccinesafetyconfidence.result;

import lombok.AllArgsConstructor;
import lombok.ToString;
import org.uoa.vaccinesafetyconfidence.utils.MessageUtils;

@AllArgsConstructor
@ToString
public enum ResponseEnum {

    SUCCESS(0, "SUCCESS"),
    ERROR(-1, "ERROR"),

    //-1xx 服务器错误


    // Custom Error
    NO_ENTITY_ERROR(3001, "No such entity."),
    TABLE_EMPTY_ERROR(3002, "Currently no record in the table."),
    NO_VAX_ERROR(3003, "Target subscribed vaccine does not exist."),
    SUBSCRIPTION_EXIST_ERROR(3004, "Target vaccine has already been subscribed."),
    WRONG_HEALTH_PROVIDER_TYPE_ERROR(3005, "This health provider does not exist."),
    WRONG_VACCINE_ID_ERROR(3006, "The vaccine ID is not correct."),


    // Account Error
    ACCOUNT_NOTEXIST_ERROR(4001, "User does not exit."),
    LOGIN_PASSWORD_ERROR(4002, "The password is wrong."),
    USER_EXIST_ERROR(4003, "This username already has already been used. "),
    USERNAME_NULL_ERROR(4004, "Username can not be empty."),
    PASSWORD_NULL_ERROR(4005, "Password can not be empty."),
    TOKEN_NULL_ERROR(4006, "No token, please log in again."),
    TOKEN_INVALID_ERROR(4007,"Invalid token, please log in again."),
    EMAIL_NULL_ERROR(4008, "Email address can not be empty."),
    EMAIL_EXIST_ERROR(4009, "This email address has been occupied already."),
    GOOGLE_TOKEN_NULL_ERROR(4010, "Google ID Token is empty or does not exist!"),
    GOOGLE_TOKEN_FORMAT_ERROR(4011, "ID Token format is not a valid JWT!"),
    GOOGLE_TOKEN_INVALID_ERROR(4012, "ID Token is invalid or expired!"),
    GOOGLE_TOKEN_VERIFICATION_EXCEPTION(4013, "Exception occurs during ID Token verification. "),
    ACCOUNT_VERIFIED_ERROR(4014, "This account has already been verified!"),
    WRONG_VERIFICATION_CODE_ERROR(4015, "The verification code is wrong!"),
    ACCOUNT_VERIFICATION_ERROR(4016, "This account did not be verified!"),
    LOGIN_AUTH_ERROR(4017, "User not login."),


    // Front Service Error
    NO_COMPONENT_ERROR(5001, "Such component does not exist."),

    ;

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return MessageUtils.get(this.message);
    }

    //响应状态码
    private Integer code;

    //响应信息
    private String message;

}
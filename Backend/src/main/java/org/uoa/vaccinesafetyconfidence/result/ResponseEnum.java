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
    LOGIN_AUTH_ERROR(2001, "User not login."),
    ENTITY_NOT_FOUND_ERROR(2002, "Entity not found."),
    ILLEGAL_NAME_ERROR(2003, "Illegal naming pattern."),
    WRONG_YEAR_PATTEN_ERROR(2004, "Please enter the correct format of year!"),
    PAGE_NUMBER_ERROR(2005, "Current page number must greater than 1."),
    USER_NO_ACCESS_ERROR(2006, "User has no access to resource."),
    USER_NOT_SUPERUSER_ERROR(2007, "Current user is not administrator."),
    DUPLICATE_NAME_ERROR(2008, "This name has already been used."),
    LACK_NAME_ERROR(2009, "Name field cannot be empty."),
    NO_MOVIE_ID_ERROR(2010, "Movie ID is required."),
    DUPLICATE_TITLE_ERROR(2011, "This title has already been used."),
    NO_RELATIVE_MOVIE_ERROR(2012, "A review must relate to an existing movie in the system."),
    NO_TITLE_ERROR(2013, "A review must have a title."),
    NO_CONTENT_ERROR(2014, "A review must have its content."),
    STAR_UPDATE_FAIL_ERROR(2015, "Can not unStar this item."),
    ITEM_STARED_ERROR(2016, "This item have already been stared."),
    ITEM_LIKED_ERROR(2017, "This item have already been liked."),
    LIKE_UPDATE_FAIL_ERROR(2018, "Can not unLike this item."),
    EMPTY_VALUE_ERROR(2019, "Each field should not be empty."),

    // Account Error
    ACCOUNT_NOTEXIST_ERROR(4001, "User does not exit."),
    LOGIN_PASSWORD_ERROR(4002, "Password is wrong."),
    ACCOUNT_EXIST_ERROR(4003, "Username already exist. "),
    USERNAME_NULL_ERROR(4004, "Username can not be empty."),
    PASSWORD_NULL_ERROR(4005, "Password can not be empty."),
    TOKEN_NULL_ERROR(4006, "No token, please log in again."),
    TOKEN_NOTUSEFUL_ERROR(4007,"Invalid token, please log in again."),

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
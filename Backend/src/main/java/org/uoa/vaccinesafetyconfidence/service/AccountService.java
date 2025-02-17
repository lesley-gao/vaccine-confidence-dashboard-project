package org.uoa.vaccinesafetyconfidence.service;

import org.uoa.vaccinesafetyconfidence.pojo.dto.UserProfileDTO;
import org.uoa.vaccinesafetyconfidence.pojo.param.GoogleAuthParam;
import org.uoa.vaccinesafetyconfidence.pojo.vo.AccountInfoVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.LoginVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.RegisterVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.UserProfileVO;

public interface AccountService {
    String register(RegisterVO registerVO);

    AccountInfoVO login(LoginVO loginVO);

    UserProfileDTO getUserProfile(String token);

    void updateUserProfile(UserProfileVO userProfileVO, String token);

    void updateUserPassword(String oldPwd, String newPwd, String token);

    void verifyEmailCode(RegisterVO registerVO);

    void sendResetPwdEmail(String email);

    void resetPwdByEmail(String email, String verificationCode, String newPwd);

    AccountInfoVO googleLogin(GoogleAuthParam googleAuthParamBody);

}

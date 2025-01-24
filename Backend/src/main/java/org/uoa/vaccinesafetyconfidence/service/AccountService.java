package org.uoa.vaccinesafetyconfidence.service;

import org.uoa.vaccinesafetyconfidence.pojo.dto.UserProfileDTO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.LoginVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.RegisterVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.UserProfileVO;
import org.uoa.vaccinesafetyconfidence.result.R;

public interface AccountService {

    String register(RegisterVO registerVO);

    R login(LoginVO loginVO);

    UserProfileDTO getUserProfile(String token);

    void updateUserProfile(UserProfileVO userProfileVO, String token);

    void updateUserPassword(String oldPwd, String newPwd, String token);
}

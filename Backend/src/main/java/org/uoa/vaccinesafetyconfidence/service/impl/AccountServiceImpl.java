package org.uoa.vaccinesafetyconfidence.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.support.SFunction;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uoa.vaccinesafetyconfidence.exception.BusinessException;
import org.uoa.vaccinesafetyconfidence.mapper.UserAccountMapper;
import org.uoa.vaccinesafetyconfidence.pojo.dto.UserProfileDTO;
import org.uoa.vaccinesafetyconfidence.pojo.entity.UserAccount;
import org.uoa.vaccinesafetyconfidence.pojo.vo.AccountInfoVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.LoginVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.RegisterVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.UserProfileVO;
import org.uoa.vaccinesafetyconfidence.result.R;
import org.uoa.vaccinesafetyconfidence.result.ResponseEnum;
import org.uoa.vaccinesafetyconfidence.service.AccountService;
import org.uoa.vaccinesafetyconfidence.utils.JwtUtils;
import org.uoa.vaccinesafetyconfidence.utils.MD5;

@Slf4j
@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private UserAccountMapper userAccountMapper;


    @Override
    public String register(RegisterVO registerVO) {

        // 检查必要字段是否为空
        if(StringUtils.isEmpty(registerVO.getUserUsername()))
            throw new BusinessException(ResponseEnum.USERNAME_NULL_ERROR);

        if(StringUtils.isEmpty(registerVO.getUserPassword()))
            throw new BusinessException(ResponseEnum.PASSWORD_NULL_ERROR);

        if(StringUtils.isEmpty(registerVO.getUserEmail()))
            throw new BusinessException(ResponseEnum.EMAIL_NULL_ERROR);

        //判断用户是否已被注册
        QueryWrapper<UserAccount> accountInfoQueryWrapper = new QueryWrapper<>();
        accountInfoQueryWrapper.eq("user_username", registerVO.getUserUsername());
        Long count = userAccountMapper.selectCount(accountInfoQueryWrapper);
        if(count != 0) {
            log.error("the username already exists");
            throw new BusinessException(ResponseEnum.USER_EXIST_ERROR);
        }

        UserAccount userAccount = new UserAccount();
        BeanUtils.copyProperties(registerVO, userAccount);
        userAccount.setUserPassword(MD5.encrypt(registerVO.getUserPassword()));
        userAccount.setUserRole(2); // 1 for admin, 2 for normal user

        userAccountMapper.insert(userAccount);
        log.info("The user has registered successfully and has been inserted into the database.");



        return "The user has registered successfully and has been inserted into the database.";
    }


    @Override
    public R login(LoginVO loginVO) {
        String userName = loginVO.getUsername();
        String password = loginVO.getPassword();
        // check username exists or not
        QueryWrapper<UserAccount> accountInfoQueryWrapper = new QueryWrapper<>();
        accountInfoQueryWrapper.eq("user_username", userName);
        UserAccount account = userAccountMapper.selectOne(accountInfoQueryWrapper);

        if(account == null) {
            log.error("user does not exist");
            return R.error().message(ResponseEnum.ACCOUNT_NOTEXIST_ERROR.getMessage()).code(ResponseEnum.ACCOUNT_NOTEXIST_ERROR.getCode());
        }
        // check password
        String md5pwd = MD5.encrypt(password);
        if(!md5pwd.equals(account.getUserPassword())) {
            log.error("password wrong");
            return R.error().message(ResponseEnum.LOGIN_PASSWORD_ERROR.getMessage()).code(ResponseEnum.LOGIN_PASSWORD_ERROR.getCode());
        }
        //generate token
        String token = JwtUtils.createToken(account.getUserUidPk(), userName);
        //Assemble user information and token into AccountInfoVO
        AccountInfoVO accountInfo = new AccountInfoVO();
        accountInfo.setUsername(account.getUserUsername());
        accountInfo.setRole(account.getUserRole());
        accountInfo.setToken(token);
        accountInfo.setUserUid(account.getUserUidPk());
        // login verification is completed, return user information
        log.info("the user is verified, return the token and log in");
        return R.ok().data(accountInfo);
    }


    @Override
    public UserProfileDTO getUserProfile(String token) {
        String userUid = JwtUtils.getAccountId(token);
        UserProfileDTO userProfileDTO = new UserProfileDTO();
        BeanUtils.copyProperties(userAccountMapper.selectById(userUid), userProfileDTO);

        return userProfileDTO;
    }

    @Override
    public void updateUserProfile(UserProfileVO userProfileVO, String token) {
        // 获得已登录用户的旧的个人资料
        String userUid = JwtUtils.getAccountId(token);
        UserAccount currentUserAccount = userAccountMapper.selectById(userUid);

        // 检查用户名是否已存在
        checkAccountValueDuplicate(
                currentUserAccount.getUserUsername(),
                userProfileVO.getUserUsername(),
                UserAccount::getUserUsername,
                ResponseEnum.USER_EXIST_ERROR
        );

        // 检查邮箱是否已存在
        checkAccountValueDuplicate(
                currentUserAccount.getUserEmail(),
                userProfileVO.getUserEmail(),
                UserAccount::getUserEmail,
                ResponseEnum.EMAIL_EXIST_ERROR
        );

        BeanUtils.copyProperties(userProfileVO, currentUserAccount);
        userAccountMapper.updateById(currentUserAccount);
    }

    @Override
    public void updateUserPassword(String oldPwd, String newPwd, String token) {
        String userUid = JwtUtils.getAccountId(token);
        UserAccount currentUserAccount = userAccountMapper.selectById(userUid);

        if ( !currentUserAccount.getUserPassword().equals(MD5.encrypt(oldPwd)) )
            throw new BusinessException(ResponseEnum.LOGIN_PASSWORD_ERROR);

        currentUserAccount.setUserPassword(MD5.encrypt(newPwd));
        userAccountMapper.updateById(currentUserAccount);
    }

    /**
     * 检查某个值（新值）是否已经存在于表中，如果存在就抛出异常
     *
     * @param oldValue     旧值
     * @param newValue     新值
     * @param getter       对应的实体字段 SFunction，作为查询条件
     * @param errorEnum    如果已存在，抛出的异常信息
     * @throws BusinessException 如果存在记录，则抛出指定异常
     */
    private void checkAccountValueDuplicate(
            String oldValue,
            String newValue,
            SFunction<UserAccount, String> getter,
            ResponseEnum errorEnum
    ) {
        // 只有在新值和旧值不相等的情况下才需要检查
        if (!newValue.equals(oldValue)) {
            // 构造查询器
            LambdaQueryWrapper<UserAccount> wrapper = new LambdaQueryWrapper<>();
            wrapper.eq(getter, newValue);

            // 如果能查到，就说明该值已存在
            if (userAccountMapper.selectOne(wrapper) != null) {
                throw new BusinessException(errorEnum);
            }
        }
    }


}

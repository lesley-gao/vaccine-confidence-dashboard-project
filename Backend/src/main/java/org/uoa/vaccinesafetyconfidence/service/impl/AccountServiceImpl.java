package org.uoa.vaccinesafetyconfidence.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.support.SFunction;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uoa.vaccinesafetyconfidence.exception.BusinessException;
import org.uoa.vaccinesafetyconfidence.mapper.UserAccountMapper;
import org.uoa.vaccinesafetyconfidence.pojo.dto.UserProfileDTO;
import org.uoa.vaccinesafetyconfidence.pojo.entity.UserAccount;
import org.uoa.vaccinesafetyconfidence.pojo.param.GoogleAuthParam;
import org.uoa.vaccinesafetyconfidence.pojo.vo.AccountInfoVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.LoginVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.RegisterVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.UserProfileVO;
import org.uoa.vaccinesafetyconfidence.result.ResponseEnum;
import org.uoa.vaccinesafetyconfidence.service.AccountService;
import org.uoa.vaccinesafetyconfidence.service.EmailService;
import org.uoa.vaccinesafetyconfidence.utils.JwtUtils;
import org.uoa.vaccinesafetyconfidence.utils.MD5;
import org.uoa.vaccinesafetyconfidence.utils.VerificationCodeUtil;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;


@Slf4j
@Service
public class AccountServiceImpl implements AccountService {

    private static final String clientId = "426797470059-p1c3ev6op2dsf8ladiprpmu15sjrh2eq.apps.googleusercontent.com";

    private static final String defaultAvatarPath = "/avatars/default-avatar.jpg";

    private GoogleIdTokenVerifier googleIdTokenVerifier;

    @Autowired
    private UserAccountMapper userAccountMapper;

    @Autowired
    private EmailService emailService;



    // 初始化GoogleAuthService时创建一个Verifier实例
    public AccountServiceImpl() {
        this.googleIdTokenVerifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(),
                new JacksonFactory()
        )
                // 要验证的受众audience，就是服务端申请的Client ID
                .setAudience(Collections.singletonList(clientId))
                .build();
    }

    @Override
    public AccountInfoVO googleLogin(GoogleAuthParam googleAuthParamBody) {
        GoogleIdToken.Payload payload = verifyGoogleToken(googleAuthParamBody.getIdCredential());
        String userGoogleId = payload.getSubject();      // Google的唯一用户ID
        String email = payload.getEmail();         // 用户的邮件
        String name = (String) payload.get("name");         // 用户的全名

        // 根据Google ID查询数据库账户
        LambdaQueryWrapper<UserAccount> userAccountLambdaQueryWrapper = new LambdaQueryWrapper<>();
        userAccountLambdaQueryWrapper.eq(UserAccount::getUserGoogleId, userGoogleId);
        UserAccount userAccount = userAccountMapper.selectOne(userAccountLambdaQueryWrapper);

        if (userAccount == null){
            // 根据Google ID查询数据库账户
            LambdaQueryWrapper<UserAccount> userAccountLambdaQueryWrapper2 = new LambdaQueryWrapper<>();
            userAccountLambdaQueryWrapper2.eq(UserAccount::getUserEmail, email);
            UserAccount accountQueryByEmail = userAccountMapper.selectOne(userAccountLambdaQueryWrapper2);

            if (accountQueryByEmail == null){
                userAccount = new UserAccount();
                String password = "Guser" + userGoogleId.substring(userGoogleId.length() - 8);
                userAccount.setUserPassword(MD5.encrypt(password));
                userAccount.setUserUsername(generateUniqueUsername(email));
                userAccount.setUserGoogleId(userGoogleId);
                userAccount.setUserEmail(email);
                userAccount.setUserFullName(name);
                userAccount.setUserAvatarPath(defaultAvatarPath);
                userAccount.setUserVerified(true);
                userAccount.setUserRole(2); // 1 for admin, 2 for normal user

                userAccountMapper.insert(userAccount);
                log.info("The user: " + userAccount.getUserUsername() + " has registered successfully and has been inserted into the database.");
                userAccount = userAccountMapper.selectOne(userAccountLambdaQueryWrapper);
            } else {
                accountQueryByEmail.setUserGoogleId(userGoogleId);
                userAccountMapper.updateById(accountQueryByEmail);
                userAccount = accountQueryByEmail;
            }
        }
        return generateTokenAndWrapAccountInfo(userAccount);
    }

    /**
     * 验证传来的 credential (ID Token)，如果验证成功则返回 Payload，否则返回 null 或抛出异常
     */
    private GoogleIdToken.Payload verifyGoogleToken(String googleIdToken){
        // 1) 判断ID token是否为空或者空白
        if (googleIdToken == null || googleIdToken.isBlank())
            throw new BusinessException(ResponseEnum.GOOGLE_TOKEN_NULL_ERROR);

        // 2) 可选：用最简单的正则校验JWT结构(三段，用.分隔)以避免library报错，不是正式安全验证
        if (!googleIdToken.matches("[A-Za-z0-9\\-_]+\\.[A-Za-z0-9\\-_]+\\.[A-Za-z0-9\\-_]+"))
            throw new BusinessException(ResponseEnum.GOOGLE_TOKEN_FORMAT_ERROR);

        // 3) 使用Google提供的签名验证与
        try {
            GoogleIdToken idToken = googleIdTokenVerifier.verify(googleIdToken);
            if (idToken == null) // idToken为空代表Token不合法/过期/与ClientID不匹配等
                throw new BusinessException(ResponseEnum.GOOGLE_TOKEN_INVALID_ERROR);
            GoogleIdToken.Payload payload = idToken.getPayload();
            if (payload == null)
                throw new BusinessException(ResponseEnum.GOOGLE_TOKEN_INVALID_ERROR);
            return payload;
        } catch (GeneralSecurityException | IOException e) {
            log.error("验证Google ID Token时出现如下异常: \n" + e.getMessage());
            throw new BusinessException(ResponseEnum.GOOGLE_TOKEN_VERIFICATION_EXCEPTION);
        }
    }

    private String generateUniqueUsername(String email){
        String[] firstHalfOfEmail = email.split("@");   // 将 email 按照 '@' 分割，取第一个部分
        // 删除除字母数字外的字符, 并取前5位
        String emailPrefix = firstHalfOfEmail[0].replaceAll("[^a-zA-Z0-9]", "").substring(0, 5);
        String username = emailPrefix + System.currentTimeMillis();
        return username;
    }



    private UserAccount getUserAccountByEmail(String email){
        LambdaQueryWrapper<UserAccount> userAccountLambdaQueryWrapper = new LambdaQueryWrapper<>();
        userAccountLambdaQueryWrapper.eq(UserAccount::getUserEmail, email);
        UserAccount userAccount = userAccountMapper.selectOne(userAccountLambdaQueryWrapper);
        if (userAccount == null)
            throw new BusinessException(ResponseEnum.NO_ACCOUNT_ERROR);
        return userAccount;
    }

    @Override
    public void resetPwdByEmail(String email, String verificationCode, String newPwd) {
        UserAccount userAccount = getUserAccountByEmail(email);
        // 验证邮箱码
        if ( !MD5.encrypt(verificationCode).matches(userAccount.getUserVerificationCode()) )
            throw new BusinessException(ResponseEnum.WRONG_VERIFICATION_CODE_ERROR);

        userAccount.setUserPassword(MD5.encrypt(newPwd));
        userAccountMapper.updateById(userAccount);

    }

    @Override
    public void sendResetPwdEmail(String email){
        UserAccount userAccount = getUserAccountByEmail(email);

        String verificationCode = VerificationCodeUtil.generateCode(6);  // 生成6位验证码
        emailService.sendEmail(email, "Your Verification Code", "Your verification code is: " + verificationCode);
        userAccount.setUserVerificationCode(MD5.encrypt(verificationCode));

        userAccountMapper.updateById(userAccount);
    }




    @Override
    public String register(RegisterVO registerVO) {

        // 检查必要字段是否为空
        if(StringUtils.isEmpty(registerVO.getUserUsername()))
            throw new BusinessException(ResponseEnum.USERNAME_NULL_ERROR);
        if(StringUtils.isEmpty(registerVO.getUserPassword()))
            throw new BusinessException(ResponseEnum.PASSWORD_NULL_ERROR);
        if(StringUtils.isEmpty(registerVO.getUserEmail()))
            throw new BusinessException(ResponseEnum.EMAIL_NULL_ERROR);

        // 判断用户是否已被注册
        LambdaQueryWrapper<UserAccount> accountInfoQueryWrapper = new LambdaQueryWrapper<>();
        accountInfoQueryWrapper.eq(UserAccount::getUserUsername, registerVO.getUserUsername());
        Long count = userAccountMapper.selectCount(accountInfoQueryWrapper);
        if(count != 0) {
            log.error("the username already exists!");
            throw new BusinessException(ResponseEnum.USER_EXIST_ERROR);
        }

        // 检查邮箱是否被使用
        accountInfoQueryWrapper = new LambdaQueryWrapper<>();
        accountInfoQueryWrapper.eq(UserAccount::getUserEmail, registerVO.getUserEmail());
        count = userAccountMapper.selectCount(accountInfoQueryWrapper);
        if(count != 0) {
            log.error("the email has been registered!");
            throw new BusinessException(ResponseEnum.EMAIL_EXIST_ERROR);
        }

        // 发送验证码邮件
        String verificationCode = VerificationCodeUtil.generateCode(6);  // 生成6位验证码
        emailService.sendEmail(registerVO.getUserEmail(), "Your Verification Code", "Your verification code is: " + verificationCode);

        UserAccount userAccount = new UserAccount();
        BeanUtils.copyProperties(registerVO, userAccount);
        userAccount.setUserPassword(MD5.encrypt(registerVO.getUserPassword()));
        userAccount.setUserRole(2); // 1 for admin, 2 for normal user
        userAccount.setUserVerificationCode(MD5.encrypt(verificationCode));

        userAccountMapper.insert(userAccount);
        log.info("The user account details has been inserted into the database.");

        return "The user account details has been inserted into the database.";
    }

    @Override
    public void verifyEmailCode(RegisterVO registerVO) {
        // 检查必要字段是否为空
        if(StringUtils.isEmpty(registerVO.getUserUsername()))
            throw new BusinessException(ResponseEnum.USERNAME_NULL_ERROR);
        if(StringUtils.isEmpty(registerVO.getUserPassword()))
            throw new BusinessException(ResponseEnum.PASSWORD_NULL_ERROR);
        if(StringUtils.isEmpty(registerVO.getUserEmail()))
            throw new BusinessException(ResponseEnum.EMAIL_NULL_ERROR);

        LambdaQueryWrapper<UserAccount> userAccountLambdaQueryWrapper = new LambdaQueryWrapper<>();
        userAccountLambdaQueryWrapper.eq(UserAccount::getUserUsername, registerVO.getUserUsername())
                .eq(UserAccount::getUserPassword, MD5.encrypt(registerVO.getUserPassword()))
                .eq(UserAccount::getUserEmail, registerVO.getUserEmail());
        UserAccount unVerifiedUserAccount = userAccountMapper.selectOne(userAccountLambdaQueryWrapper);

        if (unVerifiedUserAccount == null)
            throw new BusinessException(ResponseEnum.NO_ACCOUNT_ERROR);
        if (unVerifiedUserAccount.isUserVerified())
            throw new BusinessException(ResponseEnum.ACCOUNT_VERIFIED_ERROR);

        // 验证邮箱码
        if ( !MD5.encrypt(registerVO.getVerificationCode()).matches(unVerifiedUserAccount.getUserVerificationCode()) )
            throw new BusinessException(ResponseEnum.WRONG_VERIFICATION_CODE_ERROR);

        unVerifiedUserAccount.setUserVerified(true);
        unVerifiedUserAccount.setUserVerificationCode(null);
        userAccountMapper.updateById(unVerifiedUserAccount);
    }


    @Override
    public AccountInfoVO login(LoginVO loginVO) {
        // 检查必要字段是否为空
        if(StringUtils.isEmpty(loginVO.getUsername()))
            throw new BusinessException(ResponseEnum.USERNAME_NULL_ERROR);
        if(StringUtils.isEmpty(loginVO.getPassword()))
            throw new BusinessException(ResponseEnum.PASSWORD_NULL_ERROR);


        // 根据用户名进行查询
        LambdaQueryWrapper<UserAccount> userAccountLambdaQueryWrapper = new LambdaQueryWrapper<>();
        userAccountLambdaQueryWrapper.eq(UserAccount::getUserUsername, loginVO.getUsername());
        UserAccount userAccount = userAccountMapper.selectOne(userAccountLambdaQueryWrapper);

        if(userAccount == null) {
            log.error("The target username: " + loginVO.getUsername() + " does not exist.");
            throw new BusinessException(ResponseEnum.NO_ACCOUNT_ERROR);
        }

        if(!userAccount.isUserVerified())
            throw new BusinessException(ResponseEnum.ACCOUNT_VERIFICATION_ERROR);

        // check password
        String md5pwd = MD5.encrypt(loginVO.getPassword());
        if(!md5pwd.equals(userAccount.getUserPassword()))
            throw new BusinessException(ResponseEnum.LOGIN_PASSWORD_ERROR);


        return generateTokenAndWrapAccountInfo(userAccount);
    }

    private AccountInfoVO generateTokenAndWrapAccountInfo(UserAccount userAccount){
        //generate token
        String token = JwtUtils.createToken(userAccount.getUserUidPk(), userAccount.getUserUsername());
        //Assemble user information and token into AccountInfoVO
        AccountInfoVO accountInfo = new AccountInfoVO();
        accountInfo.setUsername(userAccount.getUserUsername());
        accountInfo.setRole(userAccount.getUserRole());
        accountInfo.setToken(token);
        accountInfo.setUserUid(userAccount.getUserUidPk());

        return accountInfo;
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

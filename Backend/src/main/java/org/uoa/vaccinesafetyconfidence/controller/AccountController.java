package org.uoa.vaccinesafetyconfidence.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.uoa.vaccinesafetyconfidence.handler.UserLoginToken;
import org.uoa.vaccinesafetyconfidence.pojo.param.GoogleAuthParam;
import org.uoa.vaccinesafetyconfidence.pojo.vo.LoginVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.RegisterVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.UserProfileVO;
import org.uoa.vaccinesafetyconfidence.result.R;
import org.uoa.vaccinesafetyconfidence.service.AccountService;


@RestController
@RequestMapping("/account")
@Validated
@Tag(name = "AccountController", description = "身份认证相关接口")
public class AccountController {
    @Autowired
    private AccountService accountService;


    @PostMapping("/google-login")
    @Operation(summary = "接收前端在POST body传来的 credential (ID Token) 进行验证.")
    public R googleLogin(@RequestBody GoogleAuthParam googleAuthParamBody) {
        return R.ok().data(accountService.googleLogin(googleAuthParamBody));
    }

    @Operation(summary = "user register")
    @PostMapping("/register/account-details")
    public R accountRegister(@RequestBody RegisterVO registerVO){
        return R.ok().data(accountService.register(registerVO));
    }

    @Operation(summary = "verify email code ")
    @PostMapping("/register/email-verification")
    public R verifyEmailCode(@RequestBody RegisterVO registerVO){
        accountService.verifyEmailCode(registerVO);
        return R.ok();
    }

    @Operation(summary = "user login")
    @PostMapping("/login")
    public R login(@RequestBody LoginVO loginVO){
        return R.ok().data(accountService.login(loginVO));
    }

    @Operation(summary = "通过token获取账户资料", security = {@SecurityRequirement(name = "token")})
    @GetMapping("/profile/get")
    @UserLoginToken
    public R getUserProfile(@RequestHeader("token") String token){
        return R.ok().data(accountService.getUserProfile(token));
    }

    @Operation(summary = "通过token修改账户资料", security = {@SecurityRequirement(name = "token")})
    @PostMapping("/profile/update")
    @UserLoginToken
    public R updateUserProfile(@RequestBody UserProfileVO userProfileVO, @RequestHeader("token") String token){
        accountService.updateUserProfile(userProfileVO, token);
        return R.ok();
    }

    @Operation(summary = "通过token修改账户密码", security = {@SecurityRequirement(name = "token")})
    @PatchMapping("/password/update")
    @UserLoginToken
    public R updateUserPassword(@RequestParam String oldPwd, @RequestParam String newPwd, @RequestHeader("token") String token){
        accountService.updateUserPassword(oldPwd, newPwd, token);
        return R.ok();
    }

    @Operation(summary = "发送重置密码的邮箱验证码")
    @GetMapping("/password-reset/email-send")
    public R sendResetPwdEmail(@RequestParam String email){
        accountService.sendResetPwdEmail(email);
        return R.ok().data("The verification email has been sent.");
    }

    @Operation(summary = "通过验证码设置新密码")
    @PatchMapping("/password-reset/verify")
    public R resetPwdByEmail(@RequestParam String email, @RequestParam String verificationCode, @RequestParam String newPwd){
        accountService.resetPwdByEmail(email, verificationCode, newPwd);
        return R.ok().data("Your password has been reset, please login again.");
    }

}

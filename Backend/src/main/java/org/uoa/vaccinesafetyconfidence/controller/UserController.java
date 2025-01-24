package org.uoa.vaccinesafetyconfidence.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.uoa.vaccinesafetyconfidence.handler.UserLoginToken;
import org.uoa.vaccinesafetyconfidence.pojo.dto.UserProfileDTO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.LoginVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.RegisterVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.UserProfileVO;
import org.uoa.vaccinesafetyconfidence.result.R;
import org.uoa.vaccinesafetyconfidence.result.ResponseEnum;
import org.uoa.vaccinesafetyconfidence.service.AccountService;
import org.uoa.vaccinesafetyconfidence.service.UserService;

import java.util.List;


@RestController
@RequestMapping("/user")
@Validated
@Tag(name = "UserController", description = "用户接口")
public class UserController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private UserService userService;

    @Operation(summary = "user register")
    @PostMapping("/register")
    public R register(@RequestBody RegisterVO registerVO){
        return R.ok().data(accountService.register(registerVO));
    }


    @Operation(summary = "user login")
    @PostMapping("/login")
    public R login(@RequestBody LoginVO loginVO){
        if(StringUtils.isEmpty(loginVO.getUsername())) {
            return R.error().message(ResponseEnum.USERNAME_NULL_ERROR.getMessage()).code(ResponseEnum.USERNAME_NULL_ERROR.getCode());
        }
        if(StringUtils.isEmpty(loginVO.getPassword())) {
            return R.error().message(ResponseEnum.PASSWORD_NULL_ERROR.getMessage()).code(ResponseEnum.PASSWORD_NULL_ERROR.getCode());
        }
        return accountService.login(loginVO);
    }


    @Operation(summary = "获取用户个人资料", security = {@SecurityRequirement(name = "token")})
    @GetMapping("/profile")
    @UserLoginToken
    public R getUserProfile(@RequestHeader("token") String token){
        return R.ok().data(accountService.getUserProfile(token));
    }

    @Operation(summary = "修改用户个人资料", security = {@SecurityRequirement(name = "token")})
    @PostMapping("/update/profile")
    @UserLoginToken
    public R updateUserProfile(@RequestBody UserProfileVO userProfileVO, @RequestHeader("token") String token){
        accountService.updateUserProfile(userProfileVO, token);
        return R.ok();
    }

    @Operation(summary = "修改用户密码", security = {@SecurityRequirement(name = "token")})
    @PatchMapping("/update/password")
    @UserLoginToken
    public R updateUserPassword(@RequestParam String oldPwd, @RequestParam String newPwd, @RequestHeader("token") String token){
        accountService.updateUserPassword(oldPwd, newPwd, token);
        return R.ok();
    }

    @Operation(summary = "订阅一个疫苗", security = {@SecurityRequirement(name = "token")})
    @PutMapping("/subscription/put")
    @UserLoginToken
    public R putASubscription(@RequestParam Integer vaccineId, @RequestHeader("token") String token){
        userService.putASubscription(token, vaccineId);
        return R.ok();
    }

    @Operation(summary = "获取用户已订阅的疫苗", security = {@SecurityRequirement(name = "token")})
    @GetMapping("/subscription/get")
    @UserLoginToken
    public R getUserSubscriptions(@RequestHeader("token") String token){
        return R.ok().data(userService.getUserSubscriptions(token));
    }

    @Operation(summary = "取消订阅一个疫苗", security = {@SecurityRequirement(name = "token")})
    @DeleteMapping("/subscription/delete")
    @UserLoginToken
    public R deleteASubscription(@RequestParam Integer vaccineId, @RequestHeader("token") String token){
        userService.deleteASubscription(token, vaccineId);
        return R.ok();
    }



}

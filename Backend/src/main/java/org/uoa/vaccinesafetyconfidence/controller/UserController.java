package org.uoa.vaccinesafetyconfidence.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.uoa.vaccinesafetyconfidence.handler.UserLoginToken;
import org.uoa.vaccinesafetyconfidence.result.R;
import org.uoa.vaccinesafetyconfidence.service.UserService;


@RestController
@RequestMapping("/user")
@Validated
@Tag(name = "UserController", description = "用户接口")
public class UserController {
    @Autowired
    private UserService userService;


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

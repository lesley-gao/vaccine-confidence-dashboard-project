package org.uoa.vaccinesafetyconfidence.handler;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.uoa.vaccinesafetyconfidence.mapper.UserAccountMapper;
import org.uoa.vaccinesafetyconfidence.pojo.entity.UserAccount;
import org.uoa.vaccinesafetyconfidence.result.ResponseEnum;
import org.uoa.vaccinesafetyconfidence.utils.JwtUtils;

import java.io.PrintWriter;
import java.lang.reflect.Method;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.alibaba.fastjson.JSONObject;


@Slf4j
public class LoginInterceptor implements HandlerInterceptor{
    @Autowired
    private UserAccountMapper userAccountMapper;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object object) throws Exception {
        String token = request.getHeader("token");
        // 如果不是映射到方法直接通过
        if(!(object instanceof HandlerMethod)){
            return true;
        }
        HandlerMethod handlerMethod=(HandlerMethod)object;
        Method method=handlerMethod.getMethod();
        //检查有没有需要用户权限的注解
        if (method.isAnnotationPresent(UserLoginToken.class)) {
            UserLoginToken userLoginToken = method.getAnnotation(UserLoginToken.class);
            if (userLoginToken.required()) {
                // 执行认证
                if (StringUtils.isEmpty(token)) {
                    response.setCharacterEncoding("UTF-8");
                    response.setContentType("application/json; charset=utf-8");
                    JSONObject res = new JSONObject();
                    res.put("code", ResponseEnum.TOKEN_NULL_ERROR.getCode());
                    res.put("message",ResponseEnum.TOKEN_NULL_ERROR.getMessage());
                    PrintWriter out = null ;
                    out = response.getWriter();
                    out.write(res.toString());
                    out.flush();
                    out.close();
                    log.error("无token，请重新登录");
                    return false;
                }

                if(!JwtUtils.checkToken(token)) {
                    response.setCharacterEncoding("UTF-8");
                    response.setContentType("application/json; charset=utf-8");
                    JSONObject res = new JSONObject();
                    res.put("code",ResponseEnum.TOKEN_INVALID_ERROR.getCode());
                    res.put("message",ResponseEnum.TOKEN_INVALID_ERROR.getMessage());
                    PrintWriter out = null ;
                    out = response.getWriter();
                    out.write(res.toString());
                    out.flush();
                    out.close();
                    log.error("Invalid token, please check the token");
                    return false;
                }

                // 获取 token 中的 user id
                String userUid = JwtUtils.getAccountId(token);
                if(userUid == null) {
                    response.setCharacterEncoding("UTF-8");
                    response.setContentType("application/json; charset=utf-8");
                    JSONObject res = new JSONObject();
                    res.put("code",ResponseEnum.LOGIN_AUTH_ERROR.getCode());
                    res.put("message",ResponseEnum.LOGIN_AUTH_ERROR.getMessage());
                    PrintWriter out = null ;
                    out = response.getWriter();
                    out.write(res.toString());
                    out.flush();
                    out.close();
                    log.error("用户未登录");
                    return false;
                }

                UserAccount userAccount = userAccountMapper.selectById(userUid);
                if (userAccount == null) {
                    response.setCharacterEncoding("UTF-8");
                    response.setContentType("application/json; charset=utf-8");
                    JSONObject res = new JSONObject();
                    res.put("code",ResponseEnum.NO_ACCOUNT_ERROR.getCode());
                    res.put("message",ResponseEnum.NO_ACCOUNT_ERROR.getMessage());
                    PrintWriter out = null ;
                    out = response.getWriter();
                    out.write(res.toString());
                    out.flush();
                    out.close();
                    log.error("用户不存在");
                    return false;
                }
                // 验证 token
                boolean result = JwtUtils.checkToken(token);
                if(!result) {
                    response.setCharacterEncoding("UTF-8");
                    response.setContentType("application/json; charset=utf-8");
                    JSONObject res = new JSONObject();
                    res.put("code",ResponseEnum.NO_ACCOUNT_ERROR.getCode());
                    res.put("message",ResponseEnum.NO_ACCOUNT_ERROR.getMessage());
                    PrintWriter out = null ;
                    out = response.getWriter();
                    out.write(res.toString());
                    out.flush();
                    out.close();
                    log.error("用户不存在");
                    return false;
                }
            }
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest,
                           HttpServletResponse httpServletResponse,
                           Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest,
                                HttpServletResponse httpServletResponse,
                                Object o, Exception e) throws Exception {
    }
}

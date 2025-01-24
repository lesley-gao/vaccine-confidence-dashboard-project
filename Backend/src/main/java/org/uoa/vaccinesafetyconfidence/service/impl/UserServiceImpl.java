package org.uoa.vaccinesafetyconfidence.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uoa.vaccinesafetyconfidence.exception.BusinessException;
import org.uoa.vaccinesafetyconfidence.mapper.UserAccountMapper;
import org.uoa.vaccinesafetyconfidence.mapper.UserSubscriptionMapper;
import org.uoa.vaccinesafetyconfidence.mapper.VaccineMapper;
import org.uoa.vaccinesafetyconfidence.pojo.dto.UserProfileDTO;
import org.uoa.vaccinesafetyconfidence.pojo.entity.UserAccount;
import org.uoa.vaccinesafetyconfidence.pojo.entity.UserSubscription;
import org.uoa.vaccinesafetyconfidence.pojo.entity.Vaccine;
import org.uoa.vaccinesafetyconfidence.result.ResponseEnum;
import org.uoa.vaccinesafetyconfidence.service.UserService;
import org.uoa.vaccinesafetyconfidence.utils.JwtUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final UserAccountMapper userAccountMapper;
    public UserServiceImpl(UserAccountMapper userAccountMapper) {
        this.userAccountMapper = userAccountMapper;
    }

    @Autowired
    private UserSubscriptionMapper userSubscriptionMapper;

    @Autowired
    private VaccineMapper vaccineMapper;


    @Override
    public void putASubscription(String token, Integer vaccineId) {
        if (vaccineMapper.selectById(vaccineId) == null)
            throw new BusinessException(ResponseEnum.NO_VAX_ERROR);

        String userUid = JwtUtils.getAccountId(token);

        LambdaQueryWrapper<UserSubscription> userSubscriptionLambdaQueryWrapper = new LambdaQueryWrapper<>();
        userSubscriptionLambdaQueryWrapper.eq(UserSubscription::getUserUidPk, userUid).eq(UserSubscription::getVacIdPk, vaccineId);


        UserSubscription userSubscription = userSubscriptionMapper.selectOne(userSubscriptionLambdaQueryWrapper);

        if (userSubscription != null)
            throw new BusinessException(ResponseEnum.SUBSCRIPTION_EXIST_ERROR);

        userSubscription = new UserSubscription(userUid, vaccineId);
        userSubscriptionMapper.insert(userSubscription);
    }

    @Override
    public List<Vaccine> getUserSubscriptions(String token) {
        String userUid = JwtUtils.getAccountId(token);
        return userSubscriptionMapper.getUserSubscribedVaccine(userUid);
    }

    @Override
    public void deleteASubscription(String token, Integer vaccineId) {
        String userUid = JwtUtils.getAccountId(token);

        LambdaQueryWrapper<UserSubscription> userSubscriptionLambdaQueryWrapper = new LambdaQueryWrapper<>();
        userSubscriptionLambdaQueryWrapper.eq(UserSubscription::getUserUidPk, userUid).eq(UserSubscription::getVacIdPk, vaccineId);
        UserSubscription userSubscription =  userSubscriptionMapper.selectOne(userSubscriptionLambdaQueryWrapper);

        // 检查目标订阅是否正确
        if (userSubscription == null)
            throw new BusinessException(ResponseEnum.WRONG_VACCINE_ID_ERROR);

        userSubscriptionMapper.deleteById(userSubscription);

    }


}

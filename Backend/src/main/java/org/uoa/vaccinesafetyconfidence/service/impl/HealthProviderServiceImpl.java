package org.uoa.vaccinesafetyconfidence.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uoa.vaccinesafetyconfidence.exception.BusinessException;
import org.uoa.vaccinesafetyconfidence.mapper.HealthProviderMapper;
import org.uoa.vaccinesafetyconfidence.mapper.HealthProviderVaccineMapper;
import org.uoa.vaccinesafetyconfidence.mapper.VaccineMapper;
import org.uoa.vaccinesafetyconfidence.pojo.entity.*;
import org.uoa.vaccinesafetyconfidence.result.ResponseEnum;
import org.uoa.vaccinesafetyconfidence.service.HealthProviderService;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class HealthProviderServiceImpl implements HealthProviderService {
    @Autowired
    private HealthProviderVaccineMapper healthProviderVaccineMapper;

    @Autowired
    private HealthProviderMapper healthProviderMapper;

    @Autowired
    private VaccineMapper vaccineMapper;


    @Override
    public List<HealthProvider> searchHealthProvidersById(Integer vaccineId){
        // 检查要查询的疫苗是否存在
        Vaccine vaccine = vaccineMapper.selectById(vaccineId);
        if (vaccine == null){
            log.error("要查找的疫苗ID不存在");
            throw new BusinessException(ResponseEnum.NO_ENTITY_ERROR);
        }

        // 查找与疫苗关联的Health Provider的ID
        QueryWrapper<HealthProviderVaccine> healthProviderVaccineQueryWrapper = new QueryWrapper<>();
        healthProviderVaccineQueryWrapper.eq("vac_id_pk", vaccineId);
        List<HealthProviderVaccine> healthProviderVaccineList = healthProviderVaccineMapper.selectList(healthProviderVaccineQueryWrapper);

        // 将查到的Health Provider的ID单独封装为一个list
        List<String> healthProviderUuids = new ArrayList<>(healthProviderVaccineList.size());
        for (HealthProviderVaccine healthProviderVaccine:healthProviderVaccineList){
            healthProviderUuids.add(healthProviderVaccine.getHpUuidPk());
        }
        // 查询所有的Health Provider
        List<HealthProvider> healthProviderList = healthProviderMapper.selectByIds(healthProviderUuids);
        log.info(vaccineId + "的行数为： " + healthProviderList.size());
        return healthProviderList;
    }


    public List<HealthProvider> getAllHealthProviders(){
        return healthProviderMapper.selectList(null);
    }

    @Override
    public List<HealthProvider> searchHealthProvidersByType(String healthProviderType) {

        LambdaQueryWrapper<HealthProvider> healthProviderLambdaQueryWrapper = new LambdaQueryWrapper<>();
        healthProviderLambdaQueryWrapper.eq(HealthProvider::getHpType, healthProviderType);
        List<HealthProvider> healthProviderList = healthProviderMapper.selectList(healthProviderLambdaQueryWrapper);

        if (healthProviderList.size() == 0)
            throw new BusinessException(ResponseEnum.WRONG_HEALTH_PROVIDER_TYPE_ERROR);
        return healthProviderList;
    }

    @Override
    public List<String> getHealthProviderTypes() {


        LambdaQueryWrapper<HealthProvider> healthProviderLambdaQueryWrapper = new LambdaQueryWrapper<>();
        healthProviderLambdaQueryWrapper.select(HealthProvider::getHpType).groupBy(HealthProvider::getHpType);

        return healthProviderMapper.selectObjs(healthProviderLambdaQueryWrapper);
    }


}

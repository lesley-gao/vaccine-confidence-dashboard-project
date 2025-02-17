package org.uoa.vaccinesafetyconfidence.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uoa.vaccinesafetyconfidence.exception.BusinessException;
import org.uoa.vaccinesafetyconfidence.mapper.ComponentDataSourceMapper;
import org.uoa.vaccinesafetyconfidence.pojo.entity.ComponentDataSource;
import org.uoa.vaccinesafetyconfidence.result.ResponseEnum;
import org.uoa.vaccinesafetyconfidence.service.FrontendComponentService;

import java.util.List;

@Service
@Slf4j
public class FrontendComponentServiceImpl implements FrontendComponentService {

    @Autowired
    ComponentDataSourceMapper componentDataSourceMapper;


    @Override
    public List<ComponentDataSource> getComponentDataSourceById(String componentId) {
        // 根据前端定义的component ID构建查询
        LambdaQueryWrapper<ComponentDataSource> componentDataSourceLambdaQueryWrapper = new LambdaQueryWrapper<>();
        componentDataSourceLambdaQueryWrapper.eq(ComponentDataSource::getCdsComponentId, componentId);
        List<ComponentDataSource> componentDataSourceList = componentDataSourceMapper.selectList(componentDataSourceLambdaQueryWrapper);

        if(componentDataSourceList.size() == 0)
            throw new BusinessException(ResponseEnum.NO_COMPONENT_ERROR);
        return componentDataSourceList;
    }

    @Override
    public List<ComponentDataSource> getAComponentDataSource() {
        return componentDataSourceMapper.selectList(null);
    }
}

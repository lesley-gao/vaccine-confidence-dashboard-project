package org.uoa.vaccinesafetyconfidence.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import org.uoa.vaccinesafetyconfidence.pojo.entity.HealthProvider;

import java.util.List;

@Repository
public interface HealthProviderMapper extends BaseMapper<HealthProvider> {

    @Select("SELECT DISTINCT `hp_type` FROM `HEALTH_PROVIDER_T`")
    List<String> getHealthProviderTypes();
}

package org.uoa.vaccinesafetyconfidence.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uoa.vaccinesafetyconfidence.exception.BusinessException;
import org.uoa.vaccinesafetyconfidence.mapper.VaccineMapper;
import org.uoa.vaccinesafetyconfidence.pojo.entity.Vaccine;
import org.uoa.vaccinesafetyconfidence.result.ResponseEnum;
import org.uoa.vaccinesafetyconfidence.service.VaccineService;

@Slf4j
@Service
public class VaccineServiceImpl implements VaccineService {

    @Autowired
    private VaccineMapper vaccineMapper;

    @Override
    public Vaccine searchVaccineById(Integer vaccineId){
        QueryWrapper<Vaccine> vaccineQueryWrapper = new QueryWrapper<>();
        vaccineQueryWrapper.eq("vac_id_pk", vaccineId);
        Long count = vaccineMapper.selectCount(vaccineQueryWrapper);
        if(count == 0) {
            throw new BusinessException(ResponseEnum.NO_RELATIVE_MOVIE_ERROR);
        }


        Vaccine vaccine = new Vaccine();
        vaccine = vaccineMapper.selectById(vaccineId);
        return vaccine;

    }


}

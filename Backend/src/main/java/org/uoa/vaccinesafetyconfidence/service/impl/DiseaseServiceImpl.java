package org.uoa.vaccinesafetyconfidence.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uoa.vaccinesafetyconfidence.exception.BusinessException;
import org.uoa.vaccinesafetyconfidence.mapper.*;
import org.uoa.vaccinesafetyconfidence.pojo.dto.DiseaseInfosDTO;
import org.uoa.vaccinesafetyconfidence.pojo.entity.*;
import org.uoa.vaccinesafetyconfidence.pojo.vo.DiseaAnnualCaseVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.DiseaIncidenceRateVO;
import org.uoa.vaccinesafetyconfidence.result.ResponseEnum;
import org.uoa.vaccinesafetyconfidence.service.DiseaseService;
import org.uoa.vaccinesafetyconfidence.utils.ConverterUtils;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class DiseaseServiceImpl implements DiseaseService {

    @Autowired
    private DiseaseMapper diseaseMapper;

    @Autowired
    private VaccineMapper vaccineMapper;

    @Autowired
    private DiseaseVaccineMapper diseaseVaccineMapper;

    @Autowired
    private DiseaIncidenceRateMapper diseaIncidenceRateMapper;

    @Autowired
    private DiseaAnnualCaseMapper diseaAnnualCaseMapper;

    @Autowired
    private DiseaOutbreakTimelineMapper diseaOutbreakTimelineMapper;

    @Autowired
    private DiseaseR0Mapper diseaseR0Mapper;


    public List<DiseaseInfosDTO> getDisease(Integer vaccineId){
        Vaccine vaccine = vaccineMapper.selectById(vaccineId);
        if (vaccine == null){
            log.error("要查找的疫苗ID不存在");
            throw new BusinessException(ResponseEnum.NO_ENTITY_ERROR);
        }

        // 查找与疫苗关联的疾病
        QueryWrapper<DiseaseVaccine> diseaseVaccineQueryWrapper = new QueryWrapper<>();
        diseaseVaccineQueryWrapper.eq("vac_id_pk", vaccineId);
        List<DiseaseVaccine> diseaseVaccines = diseaseVaccineMapper.selectList(diseaseVaccineQueryWrapper);

        List<Integer> diseaseIds = new ArrayList<>(diseaseVaccines.size());
        for (DiseaseVaccine diseaseVaccine:diseaseVaccines){
            diseaseIds.add(diseaseVaccine.getDiseaIdPk());
        }
        List<Disease> diseaseList = diseaseMapper.selectBatchIds(diseaseIds);

        List<DiseaseInfosDTO> diseaseInfosDTOList = new ArrayList<>(diseaseList.size());

        for (Disease disease:diseaseList){
            // 封装疾病本体的信息
            DiseaseInfosDTO diseaseInfosDTO = new DiseaseInfosDTO();
            diseaseInfosDTO.setDisease(disease);

            // 根据疾病ID查询相关的IncidenceRate
            QueryWrapper<DiseaIncidenceRate> diseaIncidenceRateQueryWrapper = new QueryWrapper<>();
            diseaIncidenceRateQueryWrapper.select("dir_rate", "dir_year").eq("disea_id_pk", disease.getDiseaIdPk());
            List<DiseaIncidenceRate> diseaIncidenceRateList = diseaIncidenceRateMapper.selectList(diseaIncidenceRateQueryWrapper);

            // 封装IncidenceRate
            List<DiseaIncidenceRateVO> diseaIncidenceRateVOList = ConverterUtils.convertList(diseaIncidenceRateList, DiseaIncidenceRateVO.class);
            diseaseInfosDTO.setDiseaIncidenceRateVOList(diseaIncidenceRateVOList);

            // 根据疾病ID查询相关的AnnualCase
            QueryWrapper<DiseaAnnualCase> diseaAnnualCaseQueryWrapper = new QueryWrapper<>();
            diseaAnnualCaseQueryWrapper.select("dac_numbers", "dac_year").eq("disea_id_pk", disease.getDiseaIdPk());
            List<DiseaAnnualCase> diseaAnnualCaseList = diseaAnnualCaseMapper.selectList(diseaAnnualCaseQueryWrapper);

            // 封装AnnualCase
            List<DiseaAnnualCaseVO> diseaAnnualCaseVOList = ConverterUtils.convertList(diseaAnnualCaseList, DiseaAnnualCaseVO.class);
            diseaseInfosDTO.setDiseaAnnualCaseVOList(diseaAnnualCaseVOList);


            // 将该封装好的疾病相关信息添加到整个疾病list中
            diseaseInfosDTOList.add(diseaseInfosDTO);


        }

        return diseaseInfosDTOList;
    }


    public List<DiseaOutbreakTimeline> getDiseaOutbreakTimelineByDiseaId(Integer diseaId){
        LambdaQueryWrapper<DiseaOutbreakTimeline> diseaOutbreakTimelineLambdaQueryWrapper = new LambdaQueryWrapper<>();
        diseaOutbreakTimelineLambdaQueryWrapper.eq(DiseaOutbreakTimeline::getDiseaIdPk, diseaId);
        List<DiseaOutbreakTimeline> diseaOutbreakTimelineList = diseaOutbreakTimelineMapper.selectList(diseaOutbreakTimelineLambdaQueryWrapper);

        if (diseaOutbreakTimelineList.size() == 0)
            throw new BusinessException(ResponseEnum.NO_ENTITY_ERROR);
        return diseaOutbreakTimelineList;
    }

    @Override
    public List<DiseaseR0> getDiseaR0ByDiseaId(Integer diseaId) {
        LambdaQueryWrapper<DiseaseR0> diseaseR0LambdaQueryWrapper = new LambdaQueryWrapper<>();
        diseaseR0LambdaQueryWrapper.eq(DiseaseR0::getDiseaIdPk, diseaId);
        List<DiseaseR0> diseaseR0List = diseaseR0Mapper.selectList(diseaseR0LambdaQueryWrapper);

//        if (diseaseR0List.size() == 0)
//            throw new BusinessException(ResponseEnum.NO_ENTITY_ERROR);
        return diseaseR0List;
    }


}

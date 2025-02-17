package org.uoa.vaccinesafetyconfidence.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uoa.vaccinesafetyconfidence.exception.BusinessException;
import org.uoa.vaccinesafetyconfidence.mapper.*;
import org.uoa.vaccinesafetyconfidence.pojo.dto.VaccineDoseCoverageRateDTO;
import org.uoa.vaccinesafetyconfidence.pojo.entity.*;
import org.uoa.vaccinesafetyconfidence.pojo.vo.VacCoverageRateVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.VacDevelopmentMilestoneVO;
import org.uoa.vaccinesafetyconfidence.pojo.vo.VaccineVO;
import org.uoa.vaccinesafetyconfidence.result.ResponseEnum;
import org.uoa.vaccinesafetyconfidence.service.VaccineService;
import org.uoa.vaccinesafetyconfidence.utils.ConverterUtils;


import java.util.*;

@Slf4j
@Service
public class VaccineServiceImpl implements VaccineService {

    @Autowired
    private VaccineMapper vaccineMapper;

    @Autowired
    private VacDoseMapper vacDoseMapper;

    @Autowired
    private DiseaseMapper diseaseMapper;

    @Autowired
    private DiseaseVaccineMapper diseaseVaccineMapper;

    @Autowired
    private VacCoverageRateMapper vacCoverageRateMapper;

    @Autowired
    private VacDevelopmentMilestoneMapper vacDevelopmentMilestoneMapper;

    @Autowired
    private VCISurveyGeneralMapper vciSurveyGeneralMapper;

    @Autowired
    private VCISurveyDetailedMapper vciSurveyDetailedMapper;

    @Autowired
    private GeneralSocialMediaSentimentScoreMapper generalSocialMediaSentimentScoreMapper;

    @Autowired
    private GeneralSocialMediaWordFrequencyMapper generalSocialMediaWordFrequencyMapper;


    public Vaccine checkVaccineExistence(Integer vaccineId){
        Vaccine vaccine = vaccineMapper.selectById(vaccineId);
        if (vaccine == null){
            log.error("要查找的疫苗ID不存在");
            throw new BusinessException(ResponseEnum.NO_ENTITY_ERROR);
        }
        return vaccine;
    }



    public List<VaccineVO> getAllExistingVaccines(){

        List<Vaccine> vaccineList = vaccineMapper.selectList(null);
        int vaccineListSize = vaccineList.size();
        if (vaccineListSize == 0)
            throw new BusinessException(ResponseEnum.TABLE_EMPTY_ERROR);

        List<VaccineVO> vaccineVOList = ConverterUtils.convertList(vaccineList, VaccineVO.class);
        return vaccineVOList;
    }


    @Override
    public Vaccine searchVaccineById(Integer vaccineId){
        Vaccine vaccine = vaccineMapper.selectById(vaccineId);
        if (vaccine == null){
            log.error("要查找的疫苗ID不存在");
            throw new BusinessException(ResponseEnum.NO_ENTITY_ERROR);
        }
        return vaccine;
    }


    @Override
    public List<VaccineDoseCoverageRateDTO> getVaccineDoseCoverageRate(Integer vaccineId){
        // 根据疫苗ID，查询关联的所有dose
        QueryWrapper<VacDose> vacDoseQueryWrapper = new QueryWrapper<>();
        vacDoseQueryWrapper.eq("vac_id_pk", vaccineId);
        List<VacDose> vacDoses = vacDoseMapper.selectList(vacDoseQueryWrapper);
        if (vacDoses.size() == 0)
            throw new BusinessException(ResponseEnum.TABLE_EMPTY_ERROR);

        // 根据doseID，查询每个dose的年份和覆盖率
        List<VaccineDoseCoverageRateDTO> vaccineDoseCoverageRateDTOList = new ArrayList<>(vacDoses.size());
        for (VacDose vacDose:vacDoses){
            VaccineDoseCoverageRateDTO vaccineDoseCoverageRateDTO = new VaccineDoseCoverageRateDTO();
            vaccineDoseCoverageRateDTO.setVdName(vacDose.getVdName());
            vaccineDoseCoverageRateDTO.setVdIdPk(vacDose.getVdIdPK());

            QueryWrapper<VacCoverageRate> vacCoverageRateQueryWrapper = new QueryWrapper<>();
            vacCoverageRateQueryWrapper.select("vcr_year", "vcr_annual_rate").eq("vd_id_pk", vacDose.getVdIdPK());
            List<VacCoverageRate> vacCoverageRateList = vacCoverageRateMapper.selectList(vacCoverageRateQueryWrapper);

            // 将结果封装到VO
            List<VacCoverageRateVO> vacCoverageRateVOList = ConverterUtils.convertList(vacCoverageRateList, VacCoverageRateVO.class);
//            List<VacCoverageRateVO> vacCoverageRateVOList = new ArrayList<>(vacCoverageRateList.size());
//            for (VacCoverageRate vacCoverageRate:vacCoverageRateList){
//                VacCoverageRateVO vacCoverageRateVO = new VacCoverageRateVO();
//                BeanUtils.copyProperties(vacCoverageRate, vacCoverageRateVO);
//                vacCoverageRateVOList.add(vacCoverageRateVO);
//            }

            vaccineDoseCoverageRateDTO.setVacCoverageRateVOList(vacCoverageRateVOList);
            vaccineDoseCoverageRateDTOList.add(vaccineDoseCoverageRateDTO);
        }

        log.info("疫苗覆盖率查询完成");
        return vaccineDoseCoverageRateDTOList;
    }


    @Override
    public List<VacDevelopmentMilestoneVO> getVacDevMilestone(Integer vaccineId){

        QueryWrapper<VacDevelopmentMilestone> vacDevelopmentMilestoneQueryWrapper = new QueryWrapper<>();
        vacDevelopmentMilestoneQueryWrapper.select("vdm_year", "vdm_description") .eq("vac_id_pk", vaccineId);
        List<VacDevelopmentMilestone> vacDevelopmentMilestoneList = vacDevelopmentMilestoneMapper.selectList(vacDevelopmentMilestoneQueryWrapper);
        if (vacDevelopmentMilestoneList.size() == 0)
            throw new BusinessException(ResponseEnum.TABLE_EMPTY_ERROR);

        List<VacDevelopmentMilestoneVO> vacDevelopmentMilestoneVOList = ConverterUtils.convertList(vacDevelopmentMilestoneList, VacDevelopmentMilestoneVO.class);
        //        List<VacDevelopmentMilestoneVO> vacDevelopmentMilestoneVOList = new ArrayList<>(vacDevelopmentMilestoneList.size());
//        for (VacDevelopmentMilestone vacDevelopmentMilestone:vacDevelopmentMilestoneList){
//            VacDevelopmentMilestoneVO vacDevelopmentMilestoneVO = new VacDevelopmentMilestoneVO();
//            BeanUtils.copyProperties(vacDevelopmentMilestone, vacDevelopmentMilestoneVO);
//            vacDevelopmentMilestoneVOList.add(vacDevelopmentMilestoneVO);
//        }
        return vacDevelopmentMilestoneVOList;
    }



    @Override
    public List<VCISurveyGeneral> getVCISurveyGeneralInfoOfAllVax(){
        List<VCISurveyGeneral> vciSurveyGeneralList = vciSurveyGeneralMapper.selectList(null);
        return vciSurveyGeneralList;
    }


    @Override
    public List<VCISurveyDetailed> getVCISurveyDetailedInfoOfAllVax(){
        List<VCISurveyDetailed> vciSurveyNZDetailedList = vciSurveyDetailedMapper.selectList(null);
        return vciSurveyNZDetailedList;
    }

    @Override
    public List<VCISurveyGeneral> getVCISurveyGeneralInfoByBinaryCountryCode(String binaryCountryCode){
        QueryWrapper<VCISurveyGeneral> vciSurveyGeneralQueryWrapper = new QueryWrapper<>();
        vciSurveyGeneralQueryWrapper.lambda().eq(VCISurveyGeneral::getVsgCountryCode, binaryCountryCode);

        List<VCISurveyGeneral> vciSurveyGeneralList = vciSurveyGeneralMapper.selectList(vciSurveyGeneralQueryWrapper);
        return vciSurveyGeneralList;
    }

    @Override
    public List<GeneralSocialMediaSentimentScore> getGeneralSocialMediaSentimentScore() {
        LambdaQueryWrapper<GeneralSocialMediaSentimentScore> sentimentScoreLambdaQuery = new LambdaQueryWrapper<>();
        sentimentScoreLambdaQuery.orderByAsc(GeneralSocialMediaSentimentScore::getGsmssTimeCreated);
        return generalSocialMediaSentimentScoreMapper.selectList(sentimentScoreLambdaQuery);
    }

    @Override
    public List<GeneralSocialMediaWordFrequency> getGeneralSocialMediaWordFrequency() {
        return generalSocialMediaWordFrequencyMapper.selectList(null);
    }


}

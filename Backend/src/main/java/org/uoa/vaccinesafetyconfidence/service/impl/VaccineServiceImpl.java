package org.uoa.vaccinesafetyconfidence.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.uoa.vaccinesafetyconfidence.exception.BusinessException;
import org.uoa.vaccinesafetyconfidence.mapper.*;
import org.uoa.vaccinesafetyconfidence.pojo.dto.VaccineDashboard;
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

//    private final VaccineMapper vaccineMapper;
//
//    public VaccineServiceImpl(VaccineMapper vaccineMapper) {
//        this.vaccineMapper = vaccineMapper;
//    }

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


//        List<VaccineVO> vaccineVOList = new ArrayList<>(vaccineListSize);
//        for (Vaccine vaccine:vaccineList){
//            VaccineVO vaccineVO = new VaccineVO();
//            vaccineVO.setVacId(vaccine.getVacIdPk());
//            vaccineVO.setVacType(vaccine.getVacType());
//            vaccineVOList.add(vaccineVO);
//        }
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
    public String getVaccineEfficacyById(Integer vaccineId){

        Vaccine vaccine = vaccineMapper.selectById(vaccineId);
        if (vaccine == null){
            log.error("要查找的疫苗ID不存在");
            throw new BusinessException(ResponseEnum.NO_ENTITY_ERROR);
        }
        return vaccine.getVacEfficacy();
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


//        List<VacDevelopmentMilestoneVO> vacDevelopmentMilestoneVOList = new ArrayList<>(vacDevelopmentMilestoneList.size());
//        for (VacDevelopmentMilestone vacDevelopmentMilestone:vacDevelopmentMilestoneList){
//            VacDevelopmentMilestoneVO vacDevelopmentMilestoneVO = new VacDevelopmentMilestoneVO();
//            BeanUtils.copyProperties(vacDevelopmentMilestone, vacDevelopmentMilestoneVO);
//            vacDevelopmentMilestoneVOList.add(vacDevelopmentMilestoneVO);
//        }

        List<VacDevelopmentMilestoneVO> vacDevelopmentMilestoneVOList = ConverterUtils.convertList(vacDevelopmentMilestoneList, VacDevelopmentMilestoneVO.class);


        return vacDevelopmentMilestoneVOList;
    }



    @Override
    public String getVaccineAllInfoById(Integer vaccineId){



        Vaccine vaccine = vaccineMapper.selectById(vaccineId);
        if (vaccine == null){
            log.error("要查找的疫苗ID不存在");
            throw new BusinessException(ResponseEnum.NO_ENTITY_ERROR);
        }

        VaccineDashboard vaccineDashboard = new VaccineDashboard();

        // 在最终显示结果中，存入vaccine table中需要显示的信息
        vaccineDashboard.setVacType(vaccine.getVacType());
        vaccineDashboard.setVacEfficacy(vaccine.getVacEfficacy());
        vaccineDashboard.setVacSevereCases(vaccine.getVacSevereCases());


//        // 查询疫苗都有什么dose
//        QueryWrapper<VacDose> vacDoseQueryWrapper = new QueryWrapper<>();
//        vacDoseQueryWrapper.eq("vac_id_pk", vaccineId);
//        List<VacDose> vacDoses = vacDoseMapper.selectList(vacDoseQueryWrapper);


        // 查找与疫苗关联的疾病的id
        QueryWrapper<DiseaseVaccine> diseaseVaccineQueryWrapper = new QueryWrapper<>();
        diseaseVaccineQueryWrapper.eq("vac_id_pk", vaccineId);
        List<DiseaseVaccine> diseaseVaccines = diseaseVaccineMapper.selectList(diseaseVaccineQueryWrapper);

//        List<Disease> diseaseList = new ArrayList<>(diseaseVaccines.size());

//        Vector<Disease> diseaseVector = new Vector<>(diseaseVaccines.size());

        QueryWrapper<Disease> diseaseQueryWrapper = new QueryWrapper<>();

//        diseaseMapper.selectBatchIds("")

        List<Integer> diseaseIds = new ArrayList<>(diseaseVaccines.size());



        for (DiseaseVaccine diseaseVaccine:diseaseVaccines){
            diseaseIds.add(diseaseVaccine.getDiseaIdPk());

//            diseaseQueryWrapper.or().eq("disea_id_pk", diseaseVaccine.getDisea_id_pk());

//            diseaseList.add(diseaseMapper.selectById(diseaseVaccine.getDisea_id_pk()));

        }

        vaccineDashboard.setDiseaseList(diseaseMapper.selectBatchIds(diseaseIds));



        return vaccineDashboard.toString();
    }




}

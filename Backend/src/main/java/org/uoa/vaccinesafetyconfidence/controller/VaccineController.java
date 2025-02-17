package org.uoa.vaccinesafetyconfidence.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.uoa.vaccinesafetyconfidence.result.R;
import org.uoa.vaccinesafetyconfidence.service.VaccineService;


@RestController
@RequestMapping("/vaccine")
@Validated
@Tag(name = "VaccineController", description = "疫苗接口")
public class VaccineController {
    @Autowired
    private VaccineService vaccineService;


    // APIs
    @Operation(summary = "查询系统中储存的所有疫苗的名称及其ID")
    @GetMapping("/all")
    public R getAllExistingVaccines(){
        return R.ok().data(vaccineService.getAllExistingVaccines());
    }

    @Operation(summary = "根据ID获取vaccine的efficacy、severe cases以及description")
    @GetMapping("/get/vac-id")
    public R getVaccineById(@RequestParam Integer vaccineId){
        return R.ok().data(vaccineService.searchVaccineById(vaccineId));
    }

    @GetMapping("/coverage-rate/vac-id")
    @Operation(summary = "根据ID获取疫苗的覆盖率")
    public R getVaccineDoseCoverageRate(@RequestParam Integer vaccineId){
        return R.ok().data(vaccineService.getVaccineDoseCoverageRate(vaccineId));
    }

    @GetMapping("/development-milestone/vac-id")
    @Operation(summary = "根据ID获取疫苗的milestone")
    public R getVacDevMilestone(@RequestParam Integer vaccineId){
        return R.ok().data(vaccineService.getVacDevMilestone(vaccineId));
    }

    @GetMapping("/vci-survey/general/all")
    @Operation(summary = "查询所有疫苗的所有General VCI Survey数据")
    public R getVCISurveyGeneralInfoOfAllVax(){
        return R.ok().data(vaccineService.getVCISurveyGeneralInfoOfAllVax());
    }

    @GetMapping("/vci-survey/detailed/all")
    @Operation(summary = "查询所有疫苗的所有Detailed VCI Survey数据")
    public R getVCISurveyDetailedInfoOfAllVax(){
        return R.ok().data(vaccineService.getVCISurveyDetailedInfoOfAllVax());
    }

    @GetMapping("/vci-survey/general/country-code")
    @Operation(summary = "根据2位国家代码（大写）查询特定国家的所有General VCI Survey数据")
    public R getVCISurveyGeneralInfoByBinaryCountryCode(@RequestParam String binaryCountryCode){
        return R.ok().data(vaccineService.getVCISurveyGeneralInfoByBinaryCountryCode(binaryCountryCode));
    }

    @GetMapping("/social-media/sentiment-score/general-vac")
    @Operation(summary = "Get all the social media content sentiment analysis scores about general vaccine")
    public R getGeneralSocialMediaSentimentScore(){
        return R.ok().data(vaccineService.getGeneralSocialMediaSentimentScore());
    }

    @GetMapping("/social-media/word-frequency/general-vac")
    @Operation(summary = "Get word frequency data for vaccination-related topics of social media about general vaccine in the past week")
    public R getGeneralSocialMediaWordFrequency(){
        return R.ok().data(vaccineService.getGeneralSocialMediaWordFrequency());
    }

}

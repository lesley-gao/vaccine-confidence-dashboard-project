package org.uoa.vaccinesafetyconfidence.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.uoa.vaccinesafetyconfidence.result.R;
import org.uoa.vaccinesafetyconfidence.service.DiseaseService;

@RestController
@RequestMapping("/disease")
@Validated
@Tag(name = "DiseaseController", description = "疾病相关接口")
public class DiseaseController {
    @Autowired
    private DiseaseService diseaseService;


    @Operation(summary = "根据疫苗ID获取疫苗相关的疾病的所有信息")
    @GetMapping("/all")
    public R getVaccineById(@RequestParam Integer vaccineId){
        return R.ok().data(diseaseService.getDisease(vaccineId));
    }

    @Operation(summary = "根据疾病ID获取Outbreak timeline")
    @GetMapping("/outbreak-timeline")
    public R getDiseaOutbreakTimelineByDiseaId(@RequestParam Integer diseaseId){
        return R.ok().data(diseaseService.getDiseaOutbreakTimelineByDiseaId(diseaseId));
    }

    @Operation(summary = "根据疾病ID获取R0")
    @GetMapping("/r0")
    public R getDiseaR0ByDiseaId(@RequestParam Integer diseaseId){
        return R.ok().data(diseaseService.getDiseaR0ByDiseaId(diseaseId));
    }

}

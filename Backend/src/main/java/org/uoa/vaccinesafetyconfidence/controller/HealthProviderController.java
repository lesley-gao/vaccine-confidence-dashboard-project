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
import org.uoa.vaccinesafetyconfidence.service.HealthProviderService;

@RestController
@RequestMapping("/healthProvider")
@Validated
@Tag(name = "HealthProviderController", description = "Health Provider相关接口")
public class HealthProviderController {

    @Autowired
    private HealthProviderService healthProviderService;

    @Operation(summary = "根据疫苗ID获取Health Provider的所有信息")
    @GetMapping("/all")
    public R getVaccineById(@RequestParam Integer vaccineId){
        return R.ok().data(healthProviderService.getHealthProviders(vaccineId));
    }

}

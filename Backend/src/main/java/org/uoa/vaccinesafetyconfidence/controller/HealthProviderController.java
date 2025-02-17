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
import org.uoa.vaccinesafetyconfidence.service.HealthProviderService;


@RestController
@RequestMapping("/health-provider")
@Validated
@Tag(name = "HealthProviderController", description = "Health Provider相关接口")
public class HealthProviderController {
    @Autowired
    private HealthProviderService healthProviderService;


    @Operation(summary = "根据疫苗ID获取Health Provider的所有信息")
    @GetMapping("/filter/vac-id")
    public R getHealthProviderById(@RequestParam Integer vaccineId){
        return R.ok().data(healthProviderService.searchHealthProvidersById(vaccineId));
    }

    @Operation(summary = "获取Health Provider的所有信息")
    @GetMapping("/all")
    public R getAllHealthProvider(){
        return R.ok().data(healthProviderService.getAllHealthProviders());
    }

    @Operation(summary = "显示现有的Health Provider的type都有哪些")
    @GetMapping("/types/get")
    public R getHealthProviderTypes(){
        return R.ok().data(healthProviderService.getHealthProviderTypes());
    }

    @Operation(summary = "根据type，获取所有符合的Health Provider")
    @GetMapping("/filter/hp-type")
    public R getHealthProviderByType(String healthProviderType){
        return R.ok().data(healthProviderService.searchHealthProvidersByType(healthProviderType));
    }

}

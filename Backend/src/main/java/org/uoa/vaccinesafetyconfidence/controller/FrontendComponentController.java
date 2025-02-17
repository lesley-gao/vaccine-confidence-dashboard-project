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
import org.uoa.vaccinesafetyconfidence.service.FrontendComponentService;

@RestController
@RequestMapping("/component")
@Validated
@Tag(name = "FrontendComponentController", description = "前端组件相关接口")
public class FrontendComponentController {
    @Autowired
    private FrontendComponentService frontendComponentService;


    @Operation(summary = "根据ID获取某个前端组件的信息")
    @GetMapping("/get/id")
    public R getComponentDataSourceById(@RequestParam String componentId){
        return R.ok().data(frontendComponentService.getComponentDataSourceById(componentId));
    }

    @Operation(summary = "获取所有前端组件")
    @GetMapping("/get/all")
    public R getAComponentDataSource(){
        return R.ok().data(frontendComponentService.getAComponentDataSource());
    }

}

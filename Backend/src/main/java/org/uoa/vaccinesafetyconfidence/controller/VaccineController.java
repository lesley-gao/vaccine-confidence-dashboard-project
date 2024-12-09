package org.uoa.vaccinesafetyconfidence.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.uoa.vaccinesafetyconfidence.result.R;
import org.uoa.vaccinesafetyconfidence.service.VaccineService;

@RestController
@RequestMapping("/movieReview/account")
@Validated
public class VaccineController {

    @Autowired
    private VaccineService vaccineService;


    @GetMapping("/search/id")
    public R getVaccineById(@RequestParam Integer vaccineId){
        return R.ok().data(vaccineService.searchVaccineById(vaccineId));
    }



}

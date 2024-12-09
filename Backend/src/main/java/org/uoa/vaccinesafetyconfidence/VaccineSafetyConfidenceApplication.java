package org.uoa.vaccinesafetyconfidence;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;


@ServletComponentScan
@SpringBootApplication
@MapperScan("org.uoa.vaccinesafetyconfidence.mapper")
public class VaccineSafetyConfidenceApplication {

    public static void main(String[] args) {
        SpringApplication.run(VaccineSafetyConfidenceApplication.class, args);
    }

}
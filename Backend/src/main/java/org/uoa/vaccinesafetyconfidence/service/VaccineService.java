package org.uoa.vaccinesafetyconfidence.service;

import org.uoa.vaccinesafetyconfidence.pojo.entity.Vaccine;

public interface VaccineService {


    Vaccine searchVaccineById(Integer vaccineId);

}

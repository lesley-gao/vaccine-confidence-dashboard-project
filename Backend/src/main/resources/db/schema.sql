-- SQL DDL for 90 miles vaccine safety confidence

CREATE DATABASE IF NOT EXISTS miles_vax_confidence CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE miles_vax_confidence;

-- SQL DDL used to create the CREATE TABLE VACCINE_T
CREATE TABLE IF NOT EXISTS VACCINE_T(
                                        `vac_id_pk` INT NOT NULL AUTO_INCREMENT,
                                        `vac_type` VARCHAR(255),
    `vac_efficacy` VARCHAR(1000),
    `vac_severe_cases` INT,
    PRIMARY KEY (`vac_id_pk`)
    );

-- SQL DDL used to create the CREATE TABLE VAC_DOSE_T
CREATE TABLE IF NOT EXISTS VAC_DOSE_T(
                                         `vd_id_pk` INT NOT NULL AUTO_INCREMENT,
                                         `vac_id_pk` INT NOT NULL,
                                         `vd_name` VARCHAR(255),
    PRIMARY KEY (`vd_id_pk`, `vac_id_pk`)
    );

-- SQL DDL used to create the CREATE TABLE VAC_COVERAGE_RATE_T
CREATE TABLE IF NOT EXISTS VAC_COVERAGE_RATE_T(
                                                  `vcr_id_pk` INT NOT NULL AUTO_INCREMENT,
                                                  `vd_id_pk` INT NOT NULL,
                                                  `vcr_year` INT,
                                                  `vcr_annual_rate` NUMERIC(5,4),
    PRIMARY KEY (`vcr_id_pk`, `vd_id_pk`)
    );

-- SQL DDL used to create the CREATE TABLE VAC_DEVELOPMENT_MILESTONE_T
CREATE TABLE IF NOT EXISTS VAC_DEVELOPMENT_MILESTONE_T(
                                                          `vdm_id_pk` INT NOT NULL AUTO_INCREMENT,
                                                          `vac_id_pk` INT NOT NULL,
                                                          `vdm_year` INT,
                                                          `vdm_description` VARCHAR(1000),
    PRIMARY KEY (`vdm_id_pk`, `vac_id_pk`)
    );

-- SQL DDL used to create the CREATE TABLE HEALTH_PROVIDER_T
CREATE TABLE IF NOT EXISTS HEALTH_PROVIDER_T(
    `hp_uuid_pk` CHAR(36) NOT NULL,
    `hp_name` VARCHAR(255),
    `hp_address` VARCHAR(500),
    `hp_city` VARCHAR(50),
    `hp_suburb` VARCHAR(50),
    `hp_longitude` NUMERIC(9,6),
    `hp_latitude` NUMERIC(9,6),
    PRIMARY KEY (`hp_uuid_pk`)
    );

-- SQL DDL used to create the CREATE TABLE HEALTH_PROVIDER_VACCINE_T
CREATE TABLE IF NOT EXISTS HEALTH_PROVIDER_VACCINE_T(
    `hp_uuid_pk` CHAR(36) NOT NULL,
    `vac_id_pk` INT NOT NULL,
    PRIMARY KEY (`hp_uuid_pk`, `vac_id_pk`)
    );

-- SQL DDL used to create the CREATE TABLE DISEASE_T
CREATE TABLE IF NOT EXISTS DISEASE_T(
                                        `disea_id_pk` INT NOT NULL AUTO_INCREMENT,
                                        `disea_name` VARCHAR(50),
    `disea_mortality_rate` VARCHAR(250),
    PRIMARY KEY (`disea_id_pk`)
    );

-- SQL DDL used to create the CREATE TABLE DISEASE_VACCINE_T
CREATE TABLE IF NOT EXISTS DISEASE_VACCINE_T(
                                                `disea_id_pk` INT NOT NULL,
                                                `vac_id_pk` INT NOT NULL,
                                                PRIMARY KEY (`disea_id_pk`, `vac_id_pk`)
    );

-- SQL DDL used to create the CREATE TABLE DISEA_OUTBREAK_TIMELINE
CREATE TABLE IF NOT EXISTS DISEA_OUTBREAK_TIMELINE(
                                                      `dot_id_pk` INT NOT NULL AUTO_INCREMENT,
                                                      `disea_id_pk` INT NOT NULL,
                                                      `dot_year` INT,
                                                      `dot_description` VARCHAR(2000),
    PRIMARY KEY (`dot_id_pk`, `disea_id_pk`)
    );

-- SQL DDL used to create the CREATE TABLE DISEA_ANNUAL_CASE
CREATE TABLE IF NOT EXISTS DISEA_ANNUAL_CASE(
                                                `dac_id_pk` INT NOT NULL AUTO_INCREMENT,
                                                `disea_id_pk` INT NOT NULL,
                                                `dac_numbers` INT,
                                                `dac_year` INT,
                                                PRIMARY KEY (`dac_id_pk`, `disea_id_pk`)
    );

-- SQL DDL used to create the CREATE TABLE DISEA_INCIDENCE_RATE
CREATE TABLE IF NOT EXISTS DISEA_INCIDENCE_RATE(
                                                   `dir_id_pk` INT NOT NULL AUTO_INCREMENT,
                                                   `disea_id_pk` INT NOT NULL,
                                                   `dir_rate` NUMERIC(5,1),
    `dir_year` INT,
    PRIMARY KEY (`dir_id_pk`, `disea_id_pk`)
    );
-- SQL DDL for 90 miles vaccine safety confidence

CREATE DATABASE IF NOT EXISTS miles_vax_confidence CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE miles_vax_confidence_test;

-- SQL DDL used to create the CREATE TABLE VACCINE_T
CREATE TABLE IF NOT EXISTS `VACCINE_T`(
    `vac_id_pk` INT NOT NULL AUTO_INCREMENT,
    `vac_type` VARCHAR(255),
    `vac_efficacy` VARCHAR(1000),
    `vac_severe_cases` INT,
    `vac_description` VARCHAR(1022),
    PRIMARY KEY (`vac_id_pk`)
);

-- SQL DDL used to create the CREATE TABLE VAC_DOSE_T
CREATE TABLE IF NOT EXISTS `VAC_DOSE_T`(
    `vd_id_pk` INT NOT NULL AUTO_INCREMENT,
    `vac_id_pk` INT NOT NULL,
    `vd_name` VARCHAR(255),
    PRIMARY KEY (`vd_id_pk`, `vac_id_pk`)
);

-- SQL DDL used to create the CREATE TABLE VAC_COVERAGE_RATE_T
CREATE TABLE IF NOT EXISTS `VAC_COVERAGE_RATE_T`(
    `vcr_id_pk` INT NOT NULL AUTO_INCREMENT,
    `vd_id_pk` INT NOT NULL,
    `vcr_year` INT,
    `vcr_annual_rate` NUMERIC(5,4),
    PRIMARY KEY (`vcr_id_pk`, `vd_id_pk`)
);

-- SQL DDL used to create the CREATE TABLE VAC_DEVELOPMENT_MILESTONE_T
CREATE TABLE IF NOT EXISTS `VAC_DEVELOPMENT_MILESTONE_T`(
    `vdm_id_pk` INT NOT NULL AUTO_INCREMENT,
    `vac_id_pk` INT NOT NULL,
    `vdm_year` INT,
    `vdm_description` VARCHAR(1000),
    PRIMARY KEY (`vdm_id_pk`, `vac_id_pk`)
);

-- SQL DDL used to create the CREATE TABLE HEALTH_PROVIDER_T
CREATE TABLE IF NOT EXISTS `HEALTH_PROVIDER_T`(
    `hp_uuid_pk` CHAR(36) NOT NULL,
    `hp_name` VARCHAR(255),
    `hp_address` VARCHAR(500),
    `hp_city` VARCHAR(50),
    `hp_suburb` VARCHAR(50),
    `hp_longitude` NUMERIC(9,6),
    `hp_latitude` NUMERIC(9,6),
    `hp_type` VARCHAR(63),
    PRIMARY KEY (`hp_uuid_pk`)
);

-- SQL DDL used to create the CREATE TABLE HEALTH_PROVIDER_VACCINE_T
CREATE TABLE IF NOT EXISTS `HEALTH_PROVIDER_VACCINE_T`(
    `hp_uuid_pk` CHAR(36) NOT NULL,
    `vac_id_pk` INT NOT NULL,
    PRIMARY KEY (`hp_uuid_pk`, `vac_id_pk`)
);

-- SQL DDL used to create the CREATE TABLE DISEASE_T
CREATE TABLE IF NOT EXISTS `DISEASE_T`(
    `disea_id_pk` INT NOT NULL AUTO_INCREMENT,
    `disea_name` VARCHAR(50),
    `disea_mortality_rate` VARCHAR(250),
    PRIMARY KEY (`disea_id_pk`)
);

-- SQL DDL used to create the CREATE TABLE DISEASE_VACCINE_T
CREATE TABLE IF NOT EXISTS `DISEASE_VACCINE_T`(
    `disea_id_pk` INT NOT NULL,
    `vac_id_pk` INT NOT NULL,
    PRIMARY KEY (`disea_id_pk`, `vac_id_pk`)
);

-- SQL DDL used to create the CREATE TABLE DISEA_OUTBREAK_TIMELINE
CREATE TABLE IF NOT EXISTS `DISEA_OUTBREAK_TIMELINE`(
    `dot_id_pk` INT NOT NULL AUTO_INCREMENT,
    `disea_id_pk` INT NOT NULL,
    `dot_year` INT,
    `dot_description` VARCHAR(2000),
    PRIMARY KEY (`dot_id_pk`, `disea_id_pk`)
);

-- SQL DDL used to create the CREATE TABLE DISEA_ANNUAL_CASE
CREATE TABLE IF NOT EXISTS `DISEA_ANNUAL_CASE`(
    `dac_id_pk` INT NOT NULL AUTO_INCREMENT,
    `disea_id_pk` INT NOT NULL,
    `dac_numbers` INT,
    `dac_year` INT,
    PRIMARY KEY (`dac_id_pk`, `disea_id_pk`)
);

-- SQL DDL used to create the CREATE TABLE DISEA_INCIDENCE_RATE
CREATE TABLE IF NOT EXISTS `DISEA_INCIDENCE_RATE`(
    `dir_id_pk` INT NOT NULL AUTO_INCREMENT,
    `disea_id_pk` INT NOT NULL,
    `dir_rate` NUMERIC(5,1),
    `dir_year` INT,
     PRIMARY KEY (`dir_id_pk`, `disea_id_pk`)
);

-- SQL DDL used to create the CREATE TABLE USER_T
CREATE TABLE IF NOT EXISTS `USER_ACCOUNT_T`(
    `user_uid_pk` CHAR(32) NOT NULL,
    `user_username` VARCHAR(20) NOT NULL,
    `user_password` CHAR(32) NOT NULL,
    `user_email` VARCHAR(255) NOT NULL,
    `user_google_id` VARCHAR(255),
    `user_avatar_path` VARCHAR(255),
    `user_full_name` VARCHAR(100),
    `user_role` NUMERIC(2,0) NOT NULL,
    `user_time_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `user_time_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     PRIMARY KEY (`user_uid_pk`)
);

-- SQL DDL used to create the CREATE TABLE VCI_SURVEY_GENERAL_T
CREATE TABLE IF NOT EXISTS `VCI_SURVEY_GENERAL_T`(
    `vsg_id_pk` INT NOT NULL AUTO_INCREMENT,
    `vsg_country` VARCHAR(63),
    `vsg_country_code` VARCHAR(7),
    `vsg_year` INT,
    `vsg_children` NUMERIC(5,4),
    `vsg_safe` NUMERIC(5,4),
    `vsg_effective` NUMERIC(5,4),
    `vsg_beliefs` NUMERIC(5,4),
    PRIMARY KEY (`vsg_id_pk`)
);

-- SQL DDL used to create the CREATE TABLE VCI_SURVEY_DETAILED_T
CREATE TABLE IF NOT EXISTS `VCI_SURVEY_DETAILED_T`(
    `vsd_id_pk` INT NOT NULL AUTO_INCREMENT,
    `vsd_country_code` VARCHAR(7),
    `vsd_year` INT,
    `vsd_demographics` VARCHAR(255),
    `vsd_dmg_type` VARCHAR(31),
    `vsd_children` NUMERIC(5,4),
    `vsd_safe` NUMERIC(5,4),
    `vsd_effective` NUMERIC(5,4),
    `vsd_beliefs` NUMERIC(5,4),
    PRIMARY KEY (`vsd_id_pk`)
);

-- SQL DDL used to create the CREATE TABLE GENERAL_SOCIAL_MEDIA_SENTIMENT_SCORE_T
CREATE TABLE IF NOT EXISTS `GENERAL_SOCIAL_MEDIA_SENTIMENT_SCORE_T`(
    `gsmss_id_pk` INT NOT NULL AUTO_INCREMENT,
    `gsmss_platform` VARCHAR(63),
    `gsmss_time_created` TIMESTAMP,
    `gsmss_positive` NUMERIC(5,4),
    `gsmss_neutral` NUMERIC(5,4),
    `gsmss_negative` NUMERIC(5,4),
    PRIMARY KEY (`gsmss_id_pk`)
);

-- SQL DDL used to create the CREATE TABLE GENERAL_SOCIAL_MEDIA_WORD_FREQUENCY_T
CREATE TABLE IF NOT EXISTS `GENERAL_SOCIAL_MEDIA_WORD_FREQUENCY_T`(
    `gsmwf_id_pk` INT NOT NULL AUTO_INCREMENT,
    `gsmwf_platform` VARCHAR(63),
    `gsmwf_time_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- `gsmwf_time_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `gsmwf_word` VARCHAR(31),
    `gsmwf_sentiment` ENUM('positive', 'neutral', 'negative'),
    `gsmwf_frequency` NUMERIC(5,4),
    PRIMARY KEY (`gsmwf_id_pk`)
);

-- SQL DDL used to create the CREATE TABLE USER_SUBSCRIPTION_T
CREATE TABLE IF NOT EXISTS `USER_SUBSCRIPTION_T`(
    `usc_id_pk` BIGINT NOT NULL AUTO_INCREMENT,
    `user_uid_pk` CHAR(32) NOT NULL,
    `vac_id_pk` INT NOT NULL,
    `usc_time_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (`user_uid_pk`, `vac_id_pk`),
    FOREIGN KEY (`vac_id_pk`) REFERENCES VACCINE_T (`vac_id_pk`)
    ON DELETE CASCADE,
    PRIMARY KEY (`usc_id_pk`)
);

-- SQL DDL used to create the CREATE TABLE COMPONENT_DATA_SOURCE_T
CREATE TABLE IF NOT EXISTS `COMPONENT_DATA_SOURCE_T`(
    `cds_id_pk` INT NOT NULL AUTO_INCREMENT,
    `vac_id_pk` INT NOT NULL,
    `cds_component_id` VARCHAR(63) NOT NULL,
    `cds_component_name` VARCHAR(127) NOT NULL,
    `cds_website_name` VARCHAR(127) NOT NULL,
    `cds_website_url` VARCHAR(2046) NOT NULL,
    PRIMARY KEY (`cds_id_pk`)
);
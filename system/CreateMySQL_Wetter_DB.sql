#drop database if exists Wetter;

CREATE Database Wetter;

USE Wetter;

CREATE TABLE IF NOT EXISTS `tblWetter` (
                                           `id` INT NOT NULL AUTO_INCREMENT,
                                           `type` VARCHAR(255) NULL,
    `timestamp` INT NULL,
    `latitude` FLOAT NULL,
    `longtitude` FLOAT NULL,
    `temperatur` FLOAT NULL,
    `clouds` FLOAT NULL,
    `uvi` FLOAT NULL,
    `visibility` INT NULL,
    `weather_main` VARCHAR(255) NULL,
    `weather_description` VARCHAR(255) NULL,
    `weather_icon` VARCHAR(45) NULL,
    `deleted` INT NULL DEFAULT 0,
    `sunrise` INT NULL,
    `sunset` INT NULL,
    `moonrise` INT NULL,
    `moonset` INT NULL,
    `moon_phase` FLOAT NULL,
    `pressure` INT NULL,
    `humidity` INT NULL,
    `dew_point` FLOAT NULL,
    `wind_speed` FLOAT NULL,
    `wind_deg` FLOAT NULL,
    `wind_gust` FLOAT NULL,
    `pop` FLOAT NULL,
    `rain` FLOAT NULL,
    `temp_day` FLOAT NULL,
    `temp_min` FLOAT NULL,
    `temp_max` FLOAT NULL,
    `temp_night` FLOAT NULL,
    `temp_eve` FLOAT NULL,
    `temp_morn` FLOAT NULL,
    PRIMARY KEY (`id`));
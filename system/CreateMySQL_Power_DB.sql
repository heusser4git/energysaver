#drop database if exists Power;

CREATE Database Power;

USE Power;

CREATE TABLE IF NOT EXISTS `tblPower` (
    `tstamp` INT NOT NULL,
    `mac` VARCHAR(45) NULL,
    `power` FLOAT NULL,
    `power1` FLOAT NULL,
    `pf1` FLOAT NULL,
    `current1` FLOAT NULL,
    `voltage1` FLOAT NULL,
    `isvalid1` TINYINT NULL,
    `total1` FLOAT NULL,
    `total_returned1` FLOAT NULL,
    `power2` FLOAT NULL,
    `pf2` FLOAT NULL,
    `current2` FLOAT NULL,
    `voltage2` FLOAT NULL,
    `isvalid2` TINYINT NULL,
    `total2` FLOAT NULL,
    `total_returned2` FLOAT NULL,
    `power3` FLOAT NULL,
    `pf3` FLOAT NULL,
    `current3` FLOAT NULL,
    `voltage3` FLOAT NULL,
    `isvalid3` TINYINT NULL,
    `total3` FLOAT NULL,
    `total_returned3` FLOAT NULL,
    PRIMARY KEY (`tstamp`));
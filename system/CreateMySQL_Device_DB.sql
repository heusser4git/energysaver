#drop database if exists Device;

CREATE Database Device;

USE Device;

CREATE TABLE IF NOT EXISTS `tblDevice` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `power` FLOAT NULL,
    PRIMARY KEY (`id`));

INSERT INTO tbldevice (name,power) VALUES ('Waschmaschine', 2300);
INSERT INTO tbldevice (name,power) VALUES ('Geschirrspüler', 1600);
INSERT INTO tbldevice (name,power) VALUES ('Wärmepumpe', 4500);
drop database if exists Device;

CREATE Database Device;

USE Device;

CREATE TABLE IF NOT EXISTS `tblDevice` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `nameshort` VARCHAR(255) NULL,
    `power` FLOAT NULL,
    PRIMARY KEY (`id`));

INSERT INTO tbldevice (name,nameshort,power) VALUES ('Waschmaschine', 'WM', 2300);
INSERT INTO tbldevice (name,nameshort,power) VALUES ('Geschirrspühler', 'GSS', 1600);
INSERT INTO tbldevice (name,nameshort,power) VALUES ('Wärmepumpe', 'WP', 4500);
INSERT INTO tbldevice (name,nameshort,power) VALUES ('E-Ladestation', 'EL', 6500);
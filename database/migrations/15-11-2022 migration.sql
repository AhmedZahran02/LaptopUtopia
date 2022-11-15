
CREATE DATABASE IF NOT EXISTS laptopia;
USE laptopia;

DROP TABLE IF EXISTS workfield;

CREATE TABLE
IF NOT EXISTS workfield
(
  `id` int NOT NULL AUTO_INCREMENT,
  `field` varchar (255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `brand`;
CREATE TABLE
IF NOT EXISTS `brand`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar (255) DEFAULT NULL,
  `WorkField` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY(WorkField) REFERENCES WorkField(id)
);




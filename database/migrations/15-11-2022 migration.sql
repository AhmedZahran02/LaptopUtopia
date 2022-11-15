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
  FOREIGN KEY(WorkField) REFERENCES WorkField(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `customer`;
CREATE TABLE
IF NOT EXISTS `customer`
(
  `username` varchar(50) NOT NULL,
  `firstname` varchar (255) DEFAULT NULL,
  `lastname` varchar (255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar (255) NOT NULL,
  `phone` varchar (255) DEFAULT NULL,
  `dateofbirth` DATE DEFAULT NULL,
  `city` varchar (255) DEFAULT NULL,
  `street` varchar (255) DEFAULT NULL,
  `housenumber` int DEFAULT NULL,
  PRIMARY KEY (username)
);

DROP TABLE IF EXISTS `admin`;
CREATE TABLE
IF NOT EXISTS `admin`
(
  `username` varchar(50) NOT NULL,
  `firstname` varchar (255) DEFAULT NULL,
  `lastname` varchar (255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar (255) NOT NULL,
  `phone` varchar (255) DEFAULT NULL,
  `dateofbirth` DATE DEFAULT NULL,
  `startedworkat` DATE DEFAULT NULL,
  PRIMARY KEY (username)
);

DROP TABLE IF EXISTS `product`;
CREATE TABLE
IF NOT EXISTS `product`
(
  `mid` varchar(50) NOT NULL,
  `workfield` varchar (255) NOT NULL,
  `body` varchar (500) DEFAULT NULL,
  `title` varchar (255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `imageurls` varchar (500) DEFAULT NULL,
  PRIMARY KEY (mid),
  FOREIGN KEY (workfield) REFERENCES WorkField(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `cpu`;
CREATE TABLE
IF NOT EXISTS `cpu`
(
  `mid` varchar(50) NOT NULL,
  `subbrand` varchar (255) NOT NULL,
  `brandmodifier` varchar (255) NOT NULL,
  `skunumber` varchar (255) NOT NULL,
  `numberofcores` int NOT NULL,
  `numberofthreads` int NOT NULL,
  `clockspeed` int NOT NULL,
  `cache` int NOT NULL,
  PRIMARY KEY (mid),
  FOREIGN KEY (mid) REFERENCES product(mid) ON DELETE CASCADE ON UPDATE CASCADE
);
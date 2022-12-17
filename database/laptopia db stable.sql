-- phpMyAdmin SQL Dump

-- version 5.1.1

-- https://www.phpmyadmin.net/

--

-- Host: 127.0.0.1:3306

-- Generation Time: Dec 07, 2022 at 10:57 AM

-- Server version: 8.0.27

-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */

;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */

;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */

;

/*!40101 SET NAMES utf8mb4 */

;

--

-- Database: `laptopia`

--

-- --------------------------------------------------------

--

-- Table structure for table `admin`

--

DROP TABLE IF EXISTS `admin`;

CREATE TABLE
    IF NOT EXISTS `admin` (
        `username` varchar(50) NOT NULL,
        `firstname` varchar(255) DEFAULT NULL,
        `lastname` varchar(255) DEFAULT NULL,
        `email` varchar(255) NOT NULL UNIQUE,
        `password` varchar(255) NOT NULL,
        `phone` varchar(255) DEFAULT NULL UNIQUE,
        `dateofbirth` date DEFAULT NULL,
        `startedworkat` date DEFAULT NULL,
        `owner` bit DEFAULT 0,
        PRIMARY KEY (`username`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------

--

-- Table structure for table `brand`

--

DROP TABLE IF EXISTS `brand`;

CREATE TABLE
    IF NOT EXISTS `brand` (
        `name` varchar(50) NOT NULL,
        `workfield` int NOT NULL,
        PRIMARY KEY (`name`, `workfield`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--

-- Dumping data for table `brand`

--

INSERT INTO
    `brand` (`name`, `workfield`)
VALUES ('AMD', 1), ('AMD', 2), ('ASUS', 0), ('DELL', 0), ('INTEL', 1), ('INTEL', 2), ('LENOVO', 0), ('HP', 0), ('NIVIDIA', 2), ('SAMSUNG', 3), ('SAMSUNG', 4);

-- --------------------------------------------------------

--

-- Table structure for table `cart`

--

DROP TABLE IF EXISTS `cart`;

CREATE TABLE
    IF NOT EXISTS `cart` (
        `id` int NOT NULL AUTO_INCREMENT,
        `currentprice` float NOT NULL DEFAULT 0,
        `lastmodificationdate` date DEFAULT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------

--

-- Table structure for table `cartitem`

--

DROP TABLE IF EXISTS `cartitem`;

CREATE TABLE
    IF NOT EXISTS `cartitem` (
        `id` int NOT NULL AUTO_INCREMENT,
        `productid` varchar(50) NOT NULL,
        `quantity` int NOT NULL DEFAULT 1,
        PRIMARY KEY (`id`),
        KEY `productid` (`productid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------

--

-- Table structure for table `complaint`

--

DROP TABLE IF EXISTS `complaint`;

CREATE TABLE
    IF NOT EXISTS `complaint` (
        `id` int NOT NULL AUTO_INCREMENT,
        `customerid` varchar(50) NOT NULL,
        `adminid` varchar(50) DEFAULT NULL,
        `date` date NOT NULL,
        `question` varchar(500) NOT NULL,
        `anwser` varchar(500) DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `customerid` (`customerid`),
        KEY `adminid` (`adminid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------

--

-- Table structure for table `cpu`

--

DROP TABLE IF EXISTS `cpu`;

CREATE TABLE
    IF NOT EXISTS `cpu` (
        `mid` varchar(50) NOT NULL,
        `subbrand` varchar(255) NOT NULL,
        `brandmodifier` varchar(255) NOT NULL,
        `skunumber` varchar(255) NOT NULL,
        `numberofcores` int NOT NULL,
        `numberofthreads` int NOT NULL,
        `clockspeed` float NOT NULL,
        `cache` float NOT NULL,
        PRIMARY KEY (`mid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--

-- Dumping data for table `cpu`

--

INSERT INTO
    `cpu` (
        `mid`,
        `subbrand`,
        `brandmodifier`,
        `skunumber`,
        `numberofcores`,
        `numberofthreads`,
        `clockspeed`,
        `cache`
    )
VALUES (
        'jdaskfjhjj3948djdf',
        'core',
        'i7',
        '10750H',
        6,
        12,
        3,
        32
    );

INSERT INTO
    `cpu` (
        `mid`,
        `subbrand`,
        `brandmodifier`,
        `skunumber`,
        `numberofcores`,
        `numberofthreads`,
        `clockspeed`,
        `cache`
    )
VALUES (
        'jdaskfjhjj3djdf',
        'RYZEN',
        '7',
        '4800H',
        8,
        16,
        3.2,
        64
    );

-- --------------------------------------------------------

--

-- Table structure for table `customer`

--

DROP TABLE IF EXISTS `customer`;

CREATE TABLE
    IF NOT EXISTS `customer` (
        `username` varchar(50) NOT NULL,
        `firstname` varchar(255) DEFAULT NULL,
        `lastname` varchar(255) DEFAULT NULL,
        `email` varchar(255) NOT NULL UNIQUE,
        `password` varchar(255) NOT NULL,
        `phone` varchar(255) DEFAULT NULL UNIQUE,
        `dateofbirth` date DEFAULT NULL,
        `city` varchar(255) DEFAULT NULL,
        `street` varchar(255) DEFAULT NULL,
        `housenumber` int DEFAULT NULL,
        `cartid` int NOT NULL,
        `wishlistid` int NOT NULL,
        PRIMARY KEY (`username`),
        KEY `cartid` (`cartid`),
        KEY `wishlistid` (`wishlistid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------

--

-- Table structure for table `gpu`

--

DROP TABLE IF EXISTS `gpu`;

CREATE TABLE
    IF NOT EXISTS `gpu` (
        `mid` varchar(50) NOT NULL,
        `subbrand` varchar(255) NOT NULL,
        `brandmodifier` varchar(255) NOT NULL,
        `skunumber` varchar(255) NOT NULL,
        `vram` int NOT NULL,
        `generation` varchar(255) NOT NULL,
        PRIMARY KEY (`mid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

INSERT INTO
    `gpu`(
        `mid`,
        `subbrand`,
        `brandmodifier`,
        `skunumber`,
        `vram`,
        `generation`
    )
VALUES (
        'blablatest',
        'Geforce',
        'RTX ',
        '3060TI',
        '6',
        'GDDR4'
    );

-- --------------------------------------------------------

--

-- Table structure for table `laptop`

--

DROP TABLE IF EXISTS `laptop`;

CREATE TABLE
    IF NOT EXISTS `laptop` (
        `mid` varchar(50) NOT NULL,
        `modelname` varchar(255) DEFAULT NULL,
        `os` varchar(255) DEFAULT NULL,
        `displaytype` varchar(255) DEFAULT NULL,
        `fingerprint` bit DEFAULT 0,
        `weight` float DEFAULT NULL,
        `webcam` bit DEFAULT 0,
        `webcamquality` int DEFAULT NULL,
        `displayhz` int DEFAULT 0,
        `batterycapacity` int DEFAULT 0,
        `ports` varchar(500) DEFAULT NULL,
        `touchscreen` bit DEFAULT 0,
        `cpuid` varchar(50) NOT NULL,
        `gpuid` varchar(50) NOT NULL,
        `storageid` varchar(50) NOT NULL,
        `ramid` varchar(50) NOT NULL,
        PRIMARY KEY (`mid`),
        KEY `cpuid` (`cpuid`),
        KEY `gpuid` (`gpuid`),
        KEY `ramid` (`ramid`),
        KEY `storageid` (`storageid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

INSERT INTO
    `laptop` (
        `mid`,
        `modelname`,
        `os`,
        `displaytype`,
        `fingerprint`,
        `weight`,
        `webcam`,
        `webcamquality`,
        `displayhz`,
        `batterycapacity`,
        `ports`,
        `touchscreen`,
        `cpuid`,
        `gpuid`,
        `storageid`,
        `ramid`
    )
VALUES (
        '15achvc25',
        'LEGION 5 15ARH05H',
        'WINDOWS 10 PRO',
        'LCD',
        1,
        '2.5',
        1,
        '1080',
        '144',
        '5000',
        'usb c&usb a&usb 2.0&3.5 jack',
        0,
        'jdaskfjhjj3948djdf',
        'blablatest',
        'ssdssdssdssd',
        'ramramramrem'
    );

-- --------------------------------------------------------

--

-- Table structure for table `order`

--

DROP TABLE IF EXISTS `order`;

CREATE TABLE
    IF NOT EXISTS `order` (
        `id` int NOT NULL AUTO_INCREMENT,
        `customerusername` varchar(50) NOT NULL,
        `totalprice` float NOT NULL DEFAULT 0,
        `creationdate` date DEFAULT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------

--

-- Table structure for table `orderitem`

--

DROP TABLE IF EXISTS `orderitem`;

CREATE TABLE
    IF NOT EXISTS `orderitem` (
        `id` int NOT NULL AUTO_INCREMENT,
        `orderid` int NOT NULL,
        `productid` varchar(50) NOT NULL,
        `quantity` int NOT NULL DEFAULT 1,
        PRIMARY KEY (`id`),
        KEY `orderid` (`orderid`),
        KEY `productid` (`productid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------

--

-- Table structure for table `product`

--

DROP TABLE IF EXISTS `product`;

CREATE TABLE
    IF NOT EXISTS `product` (
        `mid` varchar(50) NOT NULL,
        `brandname` varchar(50) DEFAULT NULL,
        `workfield` int DEFAULT NULL,
        `body` varchar(500) DEFAULT NULL,
        `title` varchar(255) DEFAULT NULL,
        `price` int DEFAULT NULL,
        `quantity` int DEFAULT NULL,
        `imageurls` varchar(500) DEFAULT NULL,
        `discount` float DEFAULT 0,
        PRIMARY KEY (`mid`),
        KEY `brandname` (`brandname`, `workfield`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--

-- Dumping data for table `product`

--

INSERT INTO
    `product` (
        `mid`,
        `brandname`,
        `workfield`,
        `body`,
        `title`,
        `price`,
        `quantity`,
        `imageurls`,
        `discount`
    )
VALUES (
        'jdaskfjhjj3948djdf',
        'INTEL',
        1,
        'INTEL CORE I7 10750H @2.6 GHZ',
        'INTEL CORE I7 10750H',
        3000,
        62,
        'https://m.media-amazon.com/images/I/415MKhMwn9L._AC_SY780_.jpg',
        0
    );

INSERT INTO
    `product` (
        `mid`,
        `brandname`,
        `workfield`,
        `body`,
        `title`,
        `price`,
        `quantity`,
        `imageurls`,
        `discount`
    )
VALUES (
        'jdaskfjhjj3djdf',
        'AMD',
        1,
        'RYZEN 7 4800H @3 GHZ',
        'AMD RYZEN 7 4800H',
        3000,
        62,
        'https://m.media-amazon.com/images/I/51XoylGq9iL.jpg',
        0
    );

INSERT INTO
    `product`(
        `mid`,
        `brandname`,
        `workfield`,
        `body`,
        `title`,
        `price`,
        `quantity`,
        `imageurls`,
        `discount`
    )
VALUES (
        'blablatest',
        'NIVIDIA',
        2,
        'NIVIDIA GEFORCE 3060 TI 6 GB GDDR4 WITH LATEST FEATURES AND HAHA',
        'NIVIDIA GEFORCE 3060 TI 6 GB GDDR4',
        3000,
        22,
        'https://m.media-amazon.com/images/I/71HQdX8f1NS.jpg',
        10
    );

INSERT INTO
    `product` (
        `mid`,
        `brandname`,
        `workfield`,
        `body`,
        `title`,
        `price`,
        `quantity`,
        `imageurls`,
        `discount`
    )
VALUES (
        'ramramramrem',
        'SAMSUNG',
        3,
        'Samsung 16 GB memoty stick @4.5 GHZ',
        'Samsung 16 GB Ram',
        1400,
        62,
        'https://i.ebayimg.com/images/g/99EAAOSwnMVh-tkD/s-l500.jpg',
        9
    );

INSERT INTO
    `product` (
        `mid`,
        `brandname`,
        `workfield`,
        `body`,
        `title`,
        `price`,
        `quantity`,
        `imageurls`,
        `discount`
    )
VALUES (
        'ssdssdssdssd',
        'SAMSUNG',
        4,
        'Samsung NVME 2.0 500GB SSD @4.5 GHZ',
        'Samsung NVME 2.0 500GB SSD',
        1263,
        99,
        'https://images-eu.ssl-images-amazon.com/images/I/911ujeCkGfL._AC_UL600_SR600,600_.jpg',
        12
    );

INSERT INTO
    `product`(
        `mid`,
        `brandname`,
        `workfield`,
        `body`,
        `title`,
        `price`,
        `quantity`,
        `imageurls`,
        `discount`
    )
VALUES (
        '15achvc25',
        'LENOVO',
        0,
        'Lenovo Legion 5 Gaming 2021 Intel Core i7 10750H RTX 3060 TI 500 GB SSD',
        'Lenovo Legion 5 Gaming 2021',
        32000,
        12,
        'https://www.sigma-computer.com/image/products/1567918490web-template6.png',
        15
    );

-- --------------------------------------------------------

--

-- Table structure for table `ram`

--

DROP TABLE IF EXISTS `ram`;

CREATE TABLE
    IF NOT EXISTS `ram` (
        `mid` varchar(50) NOT NULL,
        `generation` varchar(50) DEFAULT NULL,
        `writespeed` int DEFAULT 0,
        `readspeed` int DEFAULT 0,
        `capacity` int DEFAULT 0,
        PRIMARY KEY (`mid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

INSERT INTO
    `ram`(
        `mid`,
        `generation`,
        `writespeed`,
        `readspeed`,
        `capacity`
    )
VALUES (
        'ramramramrem',
        'DDR4',
        5000,
        6050,
        16
    );

-- --------------------------------------------------------

--

-- Table structure for table `review`

--

DROP TABLE IF EXISTS `review`;

CREATE TABLE
    IF NOT EXISTS `review` (
        `customerid` varchar(50) NOT NULL,
        `productid` varchar(50) NOT NULL,
        `date` date NOT NULL,
        `comment` varchar(500) NOT NULL,
        `rating` float NOT NULL,
        PRIMARY KEY (`customerid`, `productid`),
        KEY `productid` (`productid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------

--

-- Table structure for table `signinlog`

--

DROP TABLE IF EXISTS `signinlog`;

CREATE TABLE
    IF NOT EXISTS `signinlog` (
        `id` int NOT NULL AUTO_INCREMENT,
        `customerid` varchar(50) NOT NULL,
        `date` date NOT NULL,
        PRIMARY KEY (`id`),
        KEY `customerid` (`customerid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------

--

-- Table structure for table `storage`

--

DROP TABLE IF EXISTS `storage`;

CREATE TABLE
    IF NOT EXISTS `storage` (
        `mid` varchar(50) NOT NULL,
        `type` varchar(50) DEFAULT NULL,
        `color` varchar(50) DEFAULT NULL,
        `writespeed` int DEFAULT 0,
        `readspeed` int DEFAULT 0,
        `capacity` int DEFAULT 0,
        PRIMARY KEY (`mid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

INSERT INTO
    `storage`(
        `mid`,
        `type`,
        `color`,
        `writespeed`,
        `readspeed`,
        `capacity`
    )
VALUES (
        'ssdssdssdssd',
        'SSD',
        'BLUE',
        5000,
        5600,
        500
    );

-- --------------------------------------------------------

--

-- Table structure for table `wishlist`

--

DROP TABLE IF EXISTS `wishlist`;

CREATE TABLE
    IF NOT EXISTS `wishlist` (
        `id` int NOT NULL AUTO_INCREMENT,
        `lastmodificationdate` date DEFAULT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

-- --------------------------------------------------------

--

-- Table structure for table `wishlistitem`

--

DROP TABLE IF EXISTS `wishlistitem`;

CREATE TABLE
    IF NOT EXISTS `wishlistitem` (
        `id` int NOT NULL AUTO_INCREMENT,
        `productid` varchar(50) NOT NULL,
        PRIMARY KEY (`id`),
        KEY `productid` (`productid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--

-- Constraints for dumped tables

--

--

-- Constraints for table `cartitem`

--

ALTER TABLE `cartitem`
ADD
    CONSTRAINT `cartitem_ibfk_1` FOREIGN KEY (`id`) REFERENCES `wishlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
    CONSTRAINT `cartitem_ibfk_2` FOREIGN KEY (`productid`) REFERENCES `product` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE;

--

-- Constraints for table `complaint`

--

ALTER TABLE `complaint`
ADD
    CONSTRAINT `complaint_ibfk_1` FOREIGN KEY (`customerid`) REFERENCES `customer` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
    CONSTRAINT `complaint_ibfk_2` FOREIGN KEY (`adminid`) REFERENCES `admin` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--

-- Constraints for table `cpu`

--

ALTER TABLE `cpu`
ADD
    CONSTRAINT `cpu_ibfk_1` FOREIGN KEY (`mid`) REFERENCES `product` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE;

--

-- Constraints for table `customer`

--

ALTER TABLE `customer`
ADD
    CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`cartid`) REFERENCES `cart` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
    CONSTRAINT `customer_ibfk_2` FOREIGN KEY (`wishlistid`) REFERENCES `wishlist` (`id`) ON UPDATE CASCADE;

--

-- Constraints for table `gpu`

--

ALTER TABLE `gpu`
ADD
    CONSTRAINT `gpu_ibfk_1` FOREIGN KEY (`mid`) REFERENCES `product` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE;

--

-- Constraints for table `laptop`

--

ALTER TABLE `laptop`
ADD
    CONSTRAINT `laptop_ibfk_1` FOREIGN KEY (`mid`) REFERENCES `product` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
    CONSTRAINT `laptop_ibfk_2` FOREIGN KEY (`cpuid`) REFERENCES `cpu` (`mid`) ON UPDATE CASCADE,
ADD
    CONSTRAINT `laptop_ibfk_3` FOREIGN KEY (`gpuid`) REFERENCES `gpu` (`mid`) ON UPDATE CASCADE,
ADD
    CONSTRAINT `laptop_ibfk_4` FOREIGN KEY (`ramid`) REFERENCES `ram` (`mid`) ON UPDATE CASCADE,
ADD
    CONSTRAINT `laptop_ibfk_5` FOREIGN KEY (`storageid`) REFERENCES `storage` (`mid`) ON UPDATE CASCADE;

--

-- Constraints for table `orderitem`

--

ALTER TABLE `orderitem`
ADD
    CONSTRAINT `orderitem_ibfk_1` FOREIGN KEY (`orderid`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
    CONSTRAINT `orderitem_ibfk_2` FOREIGN KEY (`productid`) REFERENCES `product` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE;

--

-- Constraints for table `product`

--

ALTER TABLE `product`
ADD
    CONSTRAINT `product_ibfk_1` FOREIGN KEY (`brandname`, `workfield`) REFERENCES `brand` (`name`, `workfield`) ON DELETE
SET NULL ON UPDATE CASCADE;

--

-- Constraints for table `ram`

--

ALTER TABLE `ram`
ADD
    CONSTRAINT `ram_ibfk_1` FOREIGN KEY (`mid`) REFERENCES `product` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE;

--

-- Constraints for table `review`

--

ALTER TABLE `review`
ADD
    CONSTRAINT `review_ibfk_1` FOREIGN KEY (`productid`) REFERENCES `product` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
    CONSTRAINT `review_ibfk_2` FOREIGN KEY (`customerid`) REFERENCES `customer` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--

-- Constraints for table `signinlog`

--

ALTER TABLE `signinlog`
ADD
    CONSTRAINT `signinlog_ibfk_1` FOREIGN KEY (`customerid`) REFERENCES `customer` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--

-- Constraints for table `storage`

--

ALTER TABLE `storage`
ADD
    CONSTRAINT `storage_ibfk_1` FOREIGN KEY (`mid`) REFERENCES `product` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE;

--

-- Constraints for table `wishlistitem`

--

ALTER TABLE `wishlistitem`
ADD
    CONSTRAINT `wishlistitem_ibfk_1` FOREIGN KEY (`id`) REFERENCES `wishlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
    CONSTRAINT `wishlistitem_ibfk_2` FOREIGN KEY (`productid`) REFERENCES `product` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */

;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */

;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */

;
DROP DATABASE IF EXISTS `laptopia`;

CREATE DATABASE IF NOT EXISTS laptopia;

USE laptopia;

DROP TABLE IF EXISTS `brand`;

CREATE TABLE
    IF NOT EXISTS `brand` (
        `name` varchar (50) NOT NULL,
        `workfield` int NOT NULL,
        PRIMARY KEY (name, workfield)
    );

DROP TABLE IF EXISTS `customer`;

CREATE TABLE
    IF NOT EXISTS `customer` (
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
        `cartid` int NOT NULL,
        `wishlistid` int NOT NULL,
        PRIMARY KEY (username),
        FOREIGN KEY (cartid) REFERENCES cart(id) on DELETE
        SET
            NULL on UPDATE CASCADE,
            FOREIGN KEY (wishlistid) REFERENCES wishlist(id) on DELETE
        SET
            NULL on UPDATE CASCADE
    );

DROP TABLE IF EXISTS `admin`;

CREATE TABLE
    IF NOT EXISTS `admin` (
        `username` varchar(50) NOT NULL,
        `firstname` varchar (255) DEFAULT NULL,
        `lastname` varchar (255) DEFAULT NULL,
        `email` varchar(255) NOT NULL,
        `password` varchar (255) NOT NULL,
        `phone` varchar (255) DEFAULT NULL,
        `dateofbirth` DATE DEFAULT NULL,
        `startedworkat` DATE DEFAULT NULL,
        `owner` BIT DEFAULT 0,
        PRIMARY KEY (username)
    );

DROP TABLE IF EXISTS `product`;

CREATE TABLE
    IF NOT EXISTS `product` (
        `mid` varchar(50) NOT NULL,
        `brandname` varchar(50) NOT NULL,
        `workfield` int NOT NULL,
        `body` varchar (500) DEFAULT NULL,
        `title` varchar (255) DEFAULT NULL,
        `price` int DEFAULT NULL,
        `quantity` int DEFAULT NULL,
        `imageurls` varchar (500) DEFAULT NULL,
        `discount` float DEFAULT 0,
        PRIMARY KEY (mid),
        FOREIGN KEY(brandname) REFERENCES brand(name) on UPDATE CASCADE on DELETE
        SET
            NULL,
            FOREIGN KEY(workfield) REFERENCES brand(workfield) on UPDATE CASCADE on DELETE
        SET NULL
    );

DROP TABLE IF EXISTS `cpu`;

CREATE TABLE
    IF NOT EXISTS `cpu` (
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

DROP TABLE IF EXISTS `gpu`;

CREATE TABLE
    IF NOT EXISTS `gpu` (
        `mid` varchar(50) NOT NULL,
        `subbrand` varchar (255) NOT NULL,
        `brandmodifier` varchar (255) NOT NULL,
        `skunumber` varchar (255) NOT NULL,
        `vram` int NOT NULL,
        `generation` varchar(255) NOT NULL,
        PRIMARY KEY (mid),
        FOREIGN KEY (mid) REFERENCES product(mid) ON DELETE CASCADE ON UPDATE CASCADE
    );

DROP TABLE IF EXISTS `ram`;

CREATE TABLE
    IF NOT EXISTS `ram` (
        `mid` varchar(50) NOT NULL,
        `generation` varchar(50) DEFAULT NULL,
        `writespeed` int DEFAULT 0,
        `readspeed` int DEFAULT 0,
        `capacity` int DEFAULT 0,
        PRIMARY KEY (mid),
        FOREIGN KEY (mid) REFERENCES product(mid) ON DELETE CASCADE ON UPDATE CASCADE
    );

DROP TABLE IF EXISTS `storage`;

CREATE TABLE
    IF NOT EXISTS `storage` (
        `mid` varchar(50) NOT NULL,
        `type` varchar(50) DEFAULT NULL,
        `color` varchar(50) DEFAULT NULL,
        `writespeed` int DEFAULT 0,
        `readspeed` int DEFAULT 0,
        `capacity` int DEFAULT 0,
        PRIMARY KEY (mid),
        FOREIGN KEY (mid) REFERENCES product(mid) ON DELETE CASCADE ON UPDATE CASCADE
    );

DROP TABLE IF EXISTS `laptop`;

CREATE TABLE
    IF NOT EXISTS `laptop` (
        `mid` varchar(50) NOT NULL,
        `modelname` varchar(255) DEFAULT NULL,
        `os` varchar(255) DEFAULT NULL,
        `displaytype` varchar(255) DEFAULT NULL,
        `fingerprint` BIT DEFAULT 0,
        `weight` FLOAT DEFAULT NULL,
        `webcam` BIT DEFAULT 0,
        `webcamquality` INT DEFAULT NULL,
        `displayhz` INT DEFAULT 0,
        `batterycapacity` INT DEFAULT 0,
        `ports` VARCHAR(500) DEFAULT NULL,
        `touchscreen` BIT DEFAULT 0,
        `cpuid` varchar(50) NOT NULL,
        `gpuid` varchar(50) NOT NULL,
        `storageid` varchar(50) NOT NULL,
        `ramid` varchar(50) NOT NULL,
        PRIMARY KEY (mid),
        FOREIGN KEY (mid) REFERENCES product(mid) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (cpuid) REFERENCES cpu(mid) ON DELETE NO ACTION ON UPDATE CASCADE,
        FOREIGN KEY (gpuid) REFERENCES gpu(mid) ON DELETE NO ACTION ON UPDATE CASCADE,
        FOREIGN KEY (ramid) REFERENCES ram(mid) ON DELETE NO ACTION ON UPDATE CASCADE,
        FOREIGN KEY (storageid) REFERENCES storage(mid) ON DELETE NO ACTION ON UPDATE CASCADE
    );

DROP TABLE IF EXISTS `wishlist`;

CREATE TABLE
    IF NOT EXISTS `wishlist` (
        `id` int NOT NULL AUTO_INCREMENT,
        `lastmodificationdate` DATE DEFAULT NULL,
        PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS `wishlistitem`;

CREATE TABLE
    IF NOT EXISTS `wishlistitem` (
        `id` int NOT NULL AUTO_INCREMENT,
        `productid` VARCHAR(50) NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (id) REFERENCES wishlist(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (productid) REFERENCES product(mid) ON DELETE CASCADE ON UPDATE CASCADE
    );

DROP TABLE IF EXISTS `cart`;

CREATE TABLE
    IF NOT EXISTS `cart` (
        `id` int NOT NULL AUTO_INCREMENT,
        `currentprice` FLOAT NOT NULL DEFAULT 0,
        `lastmodificationdate` DATE DEFAULT NULL,
        PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS `cartitem`;

CREATE TABLE
    IF NOT EXISTS `cartitem` (
        `id` int NOT NULL AUTO_INCREMENT,
        `productid` VARCHAR(50) NOT NULL,
        `quantity` int NOT NULL DEFAULT 1,
        PRIMARY KEY (id),
        FOREIGN KEY (id) REFERENCES wishlist(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (productid) REFERENCES product(mid) ON DELETE CASCADE ON UPDATE CASCADE
    );

DROP TABLE IF EXISTS `review`;

CREATE TABLE
    IF NOT EXISTS `review` (
        `customerid` VARCHAR(50) NOT NULL,
        `productid` varchar(50) NOT NULL,
        `date` DATE NOT NULL,
        `comment` VARCHAR(500) NOT NULL,
        `rating` FLOAT NOT NULL,
        PRIMARY KEY (customerid, productid),
        FOREIGN KEY (productid) REFERENCES product(mid) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (customerid) REFERENCES customer(username) ON DELETE CASCADE ON UPDATE CASCADE
    );

DROP TABLE IF EXISTS `complaint`;

CREATE TABLE
    IF NOT EXISTS `complaint` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `customerid` VARCHAR(50) NOT NULL,
        `adminid` VARCHAR(50) DEFAULT NULL,
        `date` DATE NOT NULL,
        `question` VARCHAR(500) NOT NULL,
        `anwser` VARCHAR(500) DEFAULT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (customerid) REFERENCES customer(username) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (adminid) REFERENCES admin(username) ON DELETE CASCADE ON UPDATE CASCADE
    );

DROP TABLE IF EXISTS `signinlog`;

CREATE TABLE
    IF NOT EXISTS `signinlog` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `customerid` VARCHAR(50) NOT NULL,
        `date` DATE NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (customerid) REFERENCES customer(username) ON DELETE CASCADE ON UPDATE CASCADE
    );

DROP TABLE IF EXISTS `order`;

CREATE TABLE
    IF NOT EXISTS `order` (
        `id` int NOT NULL AUTO_INCREMENT,
        `customerusername` VARCHAR(50) NOT NULL,
        `totalprice` FLOAT NOT NULL DEFAULT 0,
        `creationdate` DATE DEFAULT NULL,
        PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS `orderitem`;

CREATE TABLE
    IF NOT EXISTS `orderitem` (
        `id` int NOT NULL AUTO_INCREMENT,
        `orderid` int NOT NULL,
        `productid` VARCHAR(50) NOT NULL,
        `quantity` int NOT NULL DEFAULT 1,
        PRIMARY KEY (id),
        FOREIGN KEY (orderid) REFERENCES `order`(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (productid) REFERENCES product(mid) ON DELETE CASCADE ON UPDATE CASCADE
    );
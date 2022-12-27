-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 27, 2022 at 10:01 AM
-- Server version: 8.0.31
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laptopia`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(50) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `dateofbirth` date DEFAULT NULL,
  `startedworkat` date DEFAULT NULL,
  `owner` bit(1) DEFAULT b'0',
  `imageurl` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `firstname`, `lastname`, `email`, `password`, `phone`, `dateofbirth`, `startedworkat`, `owner`, `imageurl`) VALUES
('MoA', 'Mohammed', 'Adel', 'Mohamed@admin.com', 'MoA123456789', '01123468985', '2022-12-26', '2022-12-25', b'0', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `name` varchar(50) NOT NULL,
  `workfield` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`name`, `workfield`) VALUES
('ADATA', 3),
('AMD', 1),
('AMD', 2),
('ASUS', 0),
('CORSAIR', 3),
('DELL', 0),
('HP', 0),
('HYPERX', 3),
('INTEL', 1),
('INTEL', 2),
('KINGSTON', 3),
('LENOVO', 0),
('NIVIDIA', 2),
('SAMSUNG', 3),
('SAMSUNG', 4);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int NOT NULL,
  `currentprice` float NOT NULL DEFAULT '0',
  `lastmodificationdate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `currentprice`, `lastmodificationdate`) VALUES
(1, 0, NULL),
(38, 0, '2022-12-24'),
(39, 0, '2022-12-24'),
(40, 0, '2022-12-24'),
(41, 0, '2022-12-24'),
(42, 0, '2022-12-24'),
(43, 0, '2022-12-24'),
(44, 0, '2022-12-24'),
(45, 0, '2022-12-24'),
(46, 0, '2022-12-24'),
(47, 0, '2022-12-24'),
(48, 0, '2022-12-24'),
(49, 0, '2022-12-24'),
(50, 0, '2022-12-24'),
(51, 0, '2022-12-24'),
(52, 0, '2022-12-24'),
(53, 0, '2022-12-24'),
(54, 0, '2022-12-24'),
(55, 0, '2022-12-24'),
(56, 0, '2022-12-24'),
(57, 0, '2022-12-24'),
(58, 0, '2022-12-24'),
(59, 0, '2022-12-24'),
(60, 0, '2022-12-25'),
(61, 0, '2022-12-25');

CREATE TABLE cartitem
(
    id int NOT NULL,
    productid varchar(50) NOT NULL,
    quantity int DEFAULT 0,
    FOREIGN KEY cartitem(productid) REFERENCES product(mid),
    FOREIGN KEY cartitem(id) REFERENCES cart(id),
    PRIMARY KEY (id,productid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


-- --------------------------------------------------------

--
-- Table structure for table `complaint`
--

CREATE TABLE `complaint` (
  `customerid` varchar(50) NOT NULL,
  `adminid` varchar(50) DEFAULT NULL,
  `date` date NOT NULL,
  `question` varchar(500) NOT NULL,
  `anwser` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `complaint`
--

INSERT INTO `complaint` (`customerid`, `adminid`, `date`, `question`, `anwser`) VALUES
('MoA', 'MoA', '2022-12-25', 'A', 'B Yla'),
('NilesSon', 'MoA', '2022-12-25', 'Nande Da Yoo', 'Goooo333333333333n'),
('NilesSon', 'MoA', '2022-12-25', 'Nande Taske Naenone ', 'Taske Nane'),
('NilesSon', 'MoA', '2022-12-25', 'Why I\'m Still Here', 'B Yla'),
('NilesSon', 'MoA', '2022-12-26', 'Why I\'m Still Here?', 'Just To Suffer');

-- --------------------------------------------------------

--
-- Table structure for table `cpu`
--

CREATE TABLE `cpu` (
  `mid` varchar(50) NOT NULL,
  `subbrand` varchar(255) NOT NULL,
  `brandmodifier` varchar(255) NOT NULL,
  `skunumber` varchar(255) NOT NULL,
  `numberofcores` int NOT NULL,
  `numberofthreads` int NOT NULL,
  `clockspeed` float NOT NULL,
  `cache` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `cpu`
--

INSERT INTO `cpu` (`mid`, `subbrand`, `brandmodifier`, `skunumber`, `numberofcores`, `numberofthreads`, `clockspeed`, `cache`) VALUES
('jdaskfjhjj3948djdf', 'CORE', 'I7', '10750H', 6, 12, 3, 32),
('jdaskfjhjj3djdf', 'RYZEN', '7', '4800H', 8, 16, 3.2, 64);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `username` varchar(50) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `dateofbirth` date DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `housenumber` int DEFAULT NULL,
  `cartid` int NOT NULL,
  `wishlistid` int NOT NULL,
  `imageurl` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`username`, `firstname`, `lastname`, `email`, `password`, `phone`, `dateofbirth`, `city`, `street`, `housenumber`, `cartid`, `wishlistid`, `imageurl`) VALUES
('Ahmed_Zahran', ' Ahmed', 'Zahran', 'aozaoz2017@gmail.com', 'afee9853f2aeae72391aa833fff456cc4e03414b', '01021434325', '2002-07-24', 'cairo', 'cairo', 50, 38, 16, NULL),
('MoA', 'Mohammed', 'Adel', 'Mohammed@adel.com', '123456789', '01234567890', '2022-12-20', 'giza', 'giza', 12, 1, 1, NULL),
('NilesSon', ' Mohammed', 'Adel Mohammed Ezz El', 'kokomohamed948@lolgg.com', '743e83160c7a5f4c0b8f521006fa7b313c18b033', '01118290547', '2022-12-25', 'Giza', '12 Mohammed', 12, 39, 17, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `gpu`
--

CREATE TABLE `gpu` (
  `mid` varchar(50) NOT NULL,
  `subbrand` varchar(255) NOT NULL,
  `brandmodifier` varchar(255) NOT NULL,
  `skunumber` varchar(255) NOT NULL,
  `vram` int NOT NULL,
  `generation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `gpu`
--

INSERT INTO `gpu` (`mid`, `subbrand`, `brandmodifier`, `skunumber`, `vram`, `generation`) VALUES
('blablatest', 'Geforce', 'RTX', '3060TI', 6, 'GDDR4'),
('NVR3060', 'Radeon', 'RX', '560', 4, 'GDDR5');

-- --------------------------------------------------------

--
-- Table structure for table `laptop`
--

CREATE TABLE `laptop` (
  `mid` varchar(50) NOT NULL,
  `modelname` varchar(255) DEFAULT NULL,
  `os` varchar(255) DEFAULT NULL,
  `displaytype` varchar(255) DEFAULT NULL,
  `fingerprint` bit(1) DEFAULT b'0',
  `weight` float DEFAULT NULL,
  `webcam` bit(1) DEFAULT b'0',
  `webcamquality` int DEFAULT NULL,
  `displayhz` int DEFAULT '0',
  `batterycapacity` int DEFAULT '0',
  `ports` varchar(500) DEFAULT NULL,
  `touchscreen` bit(1) DEFAULT b'0',
  `cpuid` varchar(50) NOT NULL,
  `gpuid` varchar(50) NOT NULL,
  `storageid` varchar(50) NOT NULL,
  `ramid` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `laptop`
--

INSERT INTO `laptop` (`mid`, `modelname`, `os`, `displaytype`, `fingerprint`, `weight`, `webcam`, `webcamquality`, `displayhz`, `batterycapacity`, `ports`, `touchscreen`, `cpuid`, `gpuid`, `storageid`, `ramid`) VALUES
('15achvc25', 'LEGION 5 15ARH05H', 'WINDOWS 10 PRO', 'LCD', b'1', 2.5, b'1', 1080, 144, 5000, 'usb c&usb a&usb 2.0&3.5 jack', b'0', 'jdaskfjhjj3948djdf', 'blablatest', 'ssdssdssdssd', 'ramramramrem');

-- --------------------------------------------------------

--
-- Table structure for table `orderitem`
--

CREATE TABLE `orderitem` (
  `id` int NOT NULL,
  `orderid` int NOT NULL,
  `productid` varchar(50) NOT NULL,
  `quantity` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `customerusername` varchar(50) NOT NULL,
  `totalprice` float NOT NULL DEFAULT '0',
  `creationdate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customerusername`, `totalprice`, `creationdate`) VALUES
(2, 'MoA', 3000, '2022-12-23');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `mid` varchar(50) NOT NULL,
  `brandname` varchar(50) DEFAULT NULL,
  `workfield` int DEFAULT NULL,
  `body` varchar(500) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `imageurls` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `discount` float DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`mid`, `brandname`, `workfield`, `body`, `title`, `price`, `quantity`, `imageurls`, `discount`) VALUES
('15achvc25', 'LENOVO', 0, 'Lenovo Legion 5 Gaming 2021 Intel Core i7 10750H RTX 3060 TI 500 GB SSD', 'Lenovo Legion 5 Gaming 2021', 32000, 12, 'https://media.btech.com/media/catalog/product/cache/22b1bed05f04d71c4a848d770186c3c4/l/e/lenovo-legion-5-pro-i7-11800h-1tb-16-dos_1.jpeg$https://www.lenovo.com/medias/lenovo-laptop-legion-5-17-amd-hero.png?context=bWFzdGVyfHJvb3R8MTg3MTIwfGltYWdlL3BuZ3xoODYvaDYzLzE0MTkxNjMwMjg2ODc4LnBuZ3w0Y2VkNjI2ODNiNDU2ZmQzMjg0ZjQ1YzRjNWQ3N2EyZDg2ZTFiYTY4ODQxOTM1ZWRiOWQ3OWE0ZGZiNTQ1NDk1$https://www.lenovo.com/medias/lenovo-laptop-legion-5-15-amd-subseries-hero.png?context=bWFzdGVyfHJvb3R8MTYyNjIwfGltYWdlL3BuZ3xoNTIvaDU1LzE0MTkwNDY2NjI5NjYyLnBuZ3wwNTQ1YjQxMzI0ZGJiODc2YmIwNWE3YzRiMzNlZWEzNjg1ODJkZjljNDRhOGVhYTY2YzE1N2Q5OGVhNTlhYWUw$https://www.lenovo.com/medias/?context=bWFzdGVyfHJvb3R8MjMzMzE2fGltYWdlL3BuZ3xoMmEvaDFiLzExNDAyNDg1Mzk5NTgyLnBuZ3w3ZGFlOWQ2NGYzOThjODI4MzcyYjYzNmI4NzY2ZjViOGYxN2NmZDBmOWM1MTRkMzhmZTBmMmJlNzM4NmFjOGNl$https://p4-ofp.static.pub/fes/cms/2022/03/30/6f3raqnvxavi4z85q2czxqjfyrlp1a051929.png', 15),
('blablatest', 'NIVIDIA', 2, 'NIVIDIA GEFORCE 3060 TI 6 GB GDDR4 WITH LATEST FEATURES AND HAHA', 'NIVIDIA GEFORCE 3060 TI 6 GB GDDR4', 3000, 22, 'https://m.media-amazon.com/images/I/71HQdX8f1NS.jpg', 10),
('jdaskfjhjj3948djdf', 'INTEL', 1, 'INTEL CORE I7 10750H @2.6 GHZ', 'INTEL CORE I7 10750H', 3000, 62, 'https://m.media-amazon.com/images/I/415MKhMwn9L._AC_SY780_.jpg', 0),
('jdaskfjhjj3djdf', 'AMD', 1, 'RYZEN 7 4800H @3 GHZ', 'AMD RYZEN 7 4800H', 3000, 62, 'https://m.media-amazon.com/images/I/51XoylGq9iL.jpg', 0),
('NVR3060', 'AMD', 2, 'graphics card', 'AMD Radeon RX 560', 8000, 2, 'https://m.media-amazon.com/images/I/61Ro50nLVCL.jpg', 0),
('ramramramrem', 'SAMSUNG', 3, 'Samsung 16 GB memoty stick @4.5 GHZ', 'Samsung 16 GB Ram', 1400, 62, 'https://i.ebayimg.com/images/g/99EAAOSwnMVh-tkD/s-l500.jpg', 9),
('ssdssdssdssd', 'SAMSUNG', 4, 'Samsung NVME 2.0 500GB SSD @4.5 GHZ', 'Samsung NVME 2.0 500GB SSD', 1263, 99, 'https://images-eu.ssl-images-amazon.com/images/I/911ujeCkGfL._AC_UL600_SR600,600_.jpg', 12);

-- --------------------------------------------------------

--
-- Table structure for table `ram`
--

CREATE TABLE `ram` (
  `mid` varchar(50) NOT NULL,
  `generation` varchar(50) DEFAULT NULL,
  `writespeed` int DEFAULT '0',
  `readspeed` int DEFAULT '0',
  `capacity` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `ram`
--

INSERT INTO `ram` (`mid`, `generation`, `writespeed`, `readspeed`, `capacity`) VALUES
('ramramramrem', 'DDR4', 5000, 6050, 16);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `customerid` varchar(50) NOT NULL,
  `productid` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `comment` varchar(500) NOT NULL,
  `rating` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`customerid`, `productid`, `date`, `comment`, `rating`) VALUES
('MoA', 'jdaskfjhjj3948djdf', '2022-12-24', 'Eh El 7lawa de eh el 3azama de eh el roke da', 0);

-- --------------------------------------------------------

--
-- Table structure for table `signinlog`
--

CREATE TABLE `signinlog` (
  `id` int NOT NULL,
  `customerid` varchar(50) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `storage`
--

CREATE TABLE `storage` (
  `mid` varchar(50) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `writespeed` int DEFAULT '0',
  `readspeed` int DEFAULT '0',
  `capacity` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `storage`
--

INSERT INTO `storage` (`mid`, `type`, `color`, `writespeed`, `readspeed`, `capacity`) VALUES
('ssdssdssdssd', 'SSD', 'BLUE', 5000, 5600, 500);

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int NOT NULL,
  `lastmodificationdate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `lastmodificationdate`) VALUES
(1, NULL),
(16, '2022-12-24'),
(17, '2022-12-24'),
(18, '2022-12-24'),
(19, '2022-12-24'),
(20, '2022-12-24'),
(21, '2022-12-24'),
(22, '2022-12-24'),
(23, '2022-12-24'),
(24, '2022-12-24'),
(25, '2022-12-24'),
(26, '2022-12-24'),
(27, '2022-12-24'),
(28, '2022-12-24'),
(29, '2022-12-24'),
(30, '2022-12-24'),
(31, '2022-12-24'),
(32, '2022-12-24'),
(33, '2022-12-24'),
(34, '2022-12-24'),
(35, '2022-12-24'),
(36, '2022-12-24'),
(37, '2022-12-24'),
(38, '2022-12-24'),
(39, '2022-12-24'),
(40, '2022-12-24'),
(41, '2022-12-24'),
(42, '2022-12-24'),
(43, '2022-12-24'),
(44, '2022-12-24'),
(45, '2022-12-24'),
(46, '2022-12-24'),
(47, '2022-12-24'),
(48, '2022-12-24'),
(49, '2022-12-25'),
(50, '2022-12-25');

-- --------------------------------------------------------

--
-- Table structure for table `wishlistitem`
--

CREATE TABLE `wishlistitem` (
  `id` int NOT NULL,
  `productid` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`name`,`workfield`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `complaint`
--
ALTER TABLE `complaint`
  ADD PRIMARY KEY (`customerid`,`question`),
  ADD KEY `adminid` (`adminid`);

--
-- Indexes for table `cpu`
--
ALTER TABLE `cpu`
  ADD PRIMARY KEY (`mid`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD KEY `cartid` (`cartid`),
  ADD KEY `wishlistid` (`wishlistid`);

--
-- Indexes for table `gpu`
--
ALTER TABLE `gpu`
  ADD PRIMARY KEY (`mid`);

--
-- Indexes for table `laptop`
--
ALTER TABLE `laptop`
  ADD PRIMARY KEY (`mid`),
  ADD KEY `cpuid` (`cpuid`),
  ADD KEY `gpuid` (`gpuid`),
  ADD KEY `ramid` (`ramid`),
  ADD KEY `storageid` (`storageid`);

--
-- Indexes for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderid` (`orderid`),
  ADD KEY `productid` (`productid`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`mid`),
  ADD KEY `brandname` (`brandname`,`workfield`);

--
-- Indexes for table `ram`
--
ALTER TABLE `ram`
  ADD PRIMARY KEY (`mid`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`customerid`,`productid`),
  ADD KEY `productid` (`productid`);

--
-- Indexes for table `signinlog`
--
ALTER TABLE `signinlog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customerid` (`customerid`);

--
-- Indexes for table `storage`
--
ALTER TABLE `storage`
  ADD PRIMARY KEY (`mid`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wishlistitem`
--
ALTER TABLE `wishlistitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productid` (`productid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `orderitem`
--
ALTER TABLE `orderitem`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `signinlog`
--
ALTER TABLE `signinlog`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `wishlistitem`
--
ALTER TABLE `wishlistitem`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `complaint`
--
ALTER TABLE `complaint`
  ADD CONSTRAINT `complaint_ibfk_1` FOREIGN KEY (`customerid`) REFERENCES `customer` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `complaint_ibfk_2` FOREIGN KEY (`adminid`) REFERENCES `admin` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `complaint_ibfk_3` FOREIGN KEY (`customerid`) REFERENCES `customer` (`username`),
  ADD CONSTRAINT `customerid` FOREIGN KEY (`customerid`) REFERENCES `customer` (`username`);

--
-- Constraints for table `cpu`
--
ALTER TABLE `cpu`
  ADD CONSTRAINT `cpu_ibfk_1` FOREIGN KEY (`mid`) REFERENCES `product` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`cartid`) REFERENCES `cart` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `customer_ibfk_2` FOREIGN KEY (`wishlistid`) REFERENCES `wishlist` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `gpu`
--
ALTER TABLE `gpu`
  ADD CONSTRAINT `gpu_ibfk_1` FOREIGN KEY (`mid`) REFERENCES `product` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `laptop`
--
ALTER TABLE `laptop`
  ADD CONSTRAINT `laptop_ibfk_1` FOREIGN KEY (`mid`) REFERENCES `product` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `laptop_ibfk_2` FOREIGN KEY (`cpuid`) REFERENCES `cpu` (`mid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `laptop_ibfk_3` FOREIGN KEY (`gpuid`) REFERENCES `gpu` (`mid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `laptop_ibfk_4` FOREIGN KEY (`ramid`) REFERENCES `ram` (`mid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `laptop_ibfk_5` FOREIGN KEY (`storageid`) REFERENCES `storage` (`mid`) ON UPDATE CASCADE;

--
-- Constraints for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `orderitem_ibfk_1` FOREIGN KEY (`orderid`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitem_ibfk_2` FOREIGN KEY (`productid`) REFERENCES `product` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`brandname`,`workfield`) REFERENCES `brand` (`name`, `workfield`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `ram`
--
ALTER TABLE `ram`
  ADD CONSTRAINT `ram_ibfk_1` FOREIGN KEY (`mid`) REFERENCES `product` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`productid`) REFERENCES `product` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`customerid`) REFERENCES `customer` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `signinlog`
--
ALTER TABLE `signinlog`
  ADD CONSTRAINT `signinlog_ibfk_1` FOREIGN KEY (`customerid`) REFERENCES `customer` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `storage`
--
ALTER TABLE `storage`
  ADD CONSTRAINT `storage_ibfk_1` FOREIGN KEY (`mid`) REFERENCES `product` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wishlistitem`
--
ALTER TABLE `wishlistitem`
  ADD CONSTRAINT `wishlistitem_ibfk_1` FOREIGN KEY (`id`) REFERENCES `wishlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wishlistitem_ibfk_2` FOREIGN KEY (`productid`) REFERENCES `product` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

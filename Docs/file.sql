-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 12, 2025 at 03:33 PM
-- Server version: 8.0.43-0ubuntu0.24.04.2
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `filemanager`
--

-- --------------------------------------------------------

--
-- Table structure for table `file`
--

CREATE TABLE `file` (
  `id` int NOT NULL,
  `folderId` int NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `displayName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mime` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` int NOT NULL,
  `storagePath` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnailPath` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `file`
--

INSERT INTO `file` (`id`, `folderId`, `filename`, `displayName`, `mime`, `size`, `storagePath`, `thumbnailPath`, `createdAt`, `updatedAt`) VALUES
(29, 30, 'Image-1762961229380-248382123-Hollow_Knight.jpeg', 'Hollow Knight.jpeg', 'image/jpeg', 16698, '/images/Image-1762961229380-248382123-Hollow_Knight.jpeg', '/images/Image-1762961229380-248382123-Hollow_Knight.jpeg', '2025-11-12 15:27:09.384', '2025-11-12 15:27:09.384'),
(30, 30, 'Image-1762961239671-451745281-the_deco_dorm_on_Instagram___Back_with_these___.jpeg', 'the deco dorm on Instagram_ _Back with theseâ¦.jpeg', 'image/jpeg', 70598, '/images/Image-1762961239671-451745281-the_deco_dorm_on_Instagram___Back_with_these___.jpeg', '/images/Image-1762961239671-451745281-the_deco_dorm_on_Instagram___Back_with_these___.jpeg', '2025-11-12 15:27:19.674', '2025-11-12 15:27:19.674'),
(31, 32, 'Image-1762961250403-207302269-_____________________________________________________________________________________.jpeg', 'ððºðð¼ðððð ã¤ã¤ððºððððð¾ð¾ð  !!  ð.jpeg', 'image/jpeg', 86449, '/images/Image-1762961250403-207302269-_____________________________________________________________________________________.jpeg', '/images/Image-1762961250403-207302269-_____________________________________________________________________________________.jpeg', '2025-11-12 15:27:30.405', '2025-11-12 15:27:30.405');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`id`),
  ADD KEY `file_folderId_fkey` (`folderId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `file`
--
ALTER TABLE `file`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `file`
--
ALTER TABLE `file`
  ADD CONSTRAINT `file_folderId_fkey` FOREIGN KEY (`folderId`) REFERENCES `folder` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

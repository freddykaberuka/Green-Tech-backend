-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2024 at 03:58 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `green_energy_tech`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `coldRoomId` int(11) NOT NULL,
  `status` enum('pending','approved','rejected') NOT NULL,
  `requestedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `approvedAt` timestamp NULL DEFAULT NULL,
  `startDate` datetime NOT NULL DEFAULT current_timestamp(),
  `endDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `userId`, `coldRoomId`, `status`, `requestedAt`, `approvedAt`, `startDate`, `endDate`) VALUES
(1, 3, 2, 'pending', '2024-09-09 22:48:16', '2024-09-09 23:51:38', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 3, 2, 'approved', '2024-09-09 23:52:57', '2024-09-16 11:01:19', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 3, 2, 'pending', '2024-09-15 23:41:56', NULL, '1969-12-31 21:37:21', '1969-12-31 21:37:21'),
(4, 3, 2, 'pending', '2024-09-15 23:43:02', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 3, 2, 'pending', '2024-09-15 23:48:35', NULL, '1969-12-31 21:37:21', '1969-12-31 21:37:21'),
(6, 3, 2, 'pending', '2024-09-16 00:00:10', NULL, '1969-12-31 21:37:21', '1969-12-31 21:37:21'),
(7, 3, 2, 'pending', '2024-09-16 00:02:52', NULL, '1969-12-31 21:37:21', '1969-12-31 21:37:21'),
(8, 3, 2, 'pending', '2024-09-16 17:01:01', NULL, '1970-01-01 05:37:21', '1970-01-01 05:37:21'),
(9, 3, 2, 'approved', '2024-09-16 17:02:23', '2024-09-16 11:02:23', '2024-11-11 00:00:00', '2024-11-12 00:00:00'),
(10, 3, 2, 'approved', '2024-09-16 23:19:33', '2024-09-16 23:20:50', '2024-11-10 16:00:00', '2024-11-11 16:00:00'),
(11, 9, 2, 'pending', '2024-09-17 18:09:21', NULL, '2024-11-10 16:00:00', '2024-11-17 16:00:00'),
(12, 9, 2, 'pending', '2024-09-17 21:38:14', NULL, '2024-09-17 17:00:00', '2024-09-19 17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `cold_rooms`
--

CREATE TABLE `cold_rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cold_rooms`
--

INSERT INTO `cold_rooms` (`id`, `name`, `location`, `capacity`, `unit`, `price`, `status`) VALUES
(2, 'vegetable', 'Gasabo', 20, 'kg', '', 'available'),
(4, 'Meat', 'Gasabo', 30, 'm2', '1000', 'available'),
(5, 'Fruit', 'Kicukiro', 200, 'kg', '1000', 'available');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `names` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `reset_token` varchar(255) NOT NULL,
  `reset_token_expiry` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `names`, `email`, `password`, `role`, `reset_token`, `reset_token_expiry`) VALUES
(1, '', 'admin@mail.com', '$2b$10$BhnzrZcmStF2LzXrFpbg2egdz5k/fDHmXS0pgQbbLxp0jbn7PygQ2', 'admin', '', ''),
(2, '', 'user@mail.com', '$2b$10$X4btPTikB8sj5IYjdfUHZOibgDU2zXKjeXAv6o.TZaXQk.5nsK4s.', '', '', ''),
(3, '', 'user@gmail.com', '$2b$10$9usZuQAmd/ONEOhDr2brwOlDRqNgYdQeH1aSgT2OXfJFNjykxhz.a', 'user', '', ''),
(4, '', 'admin@admin.com', '$2b$10$1wAQ5dHXMi4iD7Aa6.tNruUOwxSbMbO37eFLeo1tZGJzVd9tXyBlu', 'user', '', ''),
(5, '', 'admin@ad.com', '$2b$10$5fUEym3FlJwoRgeJ9/t0xOQHx8aC0JmKgviabRMTn6ASrnr9oXjje', 'user', '', ''),
(6, '', 'admin@adm.com', '$2b$10$Z581yjT8ewn1uOHuRwxcaePHXdPheHiVim7r02ficbCt4vx/fJt8.', 'admin', '', ''),
(7, '', 'test@mail.com', '$2b$10$OkVQsJmUY34zHS7ddwjFWe48E.SWupod.EHPUgccnsiJOven2Uw1O', 'user', '', ''),
(8, '', 'trojanx07@gmail.com', '$2b$10$m8pY51ckR6QgOSBopmksp.Bh8WdES86oIFI6jHKQIf8rR33DAmYnS', 'user', 'bc1fbcbee8b9322a9a60a2eaf4b8e2335a3e6963db1f5211ad600948869fd5f5', '1726428520816'),
(9, 'Freddy Kaberuka', 'trojan@mail.com', '$2b$10$K8j02cwVev37jEHh.P607ePBT5UpbMPs2acswFck.uXgnJk706xBK', 'user', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `coldRoomId` (`coldRoomId`);

--
-- Indexes for table `cold_rooms`
--
ALTER TABLE `cold_rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `cold_rooms`
--
ALTER TABLE `cold_rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`coldRoomId`) REFERENCES `cold_rooms` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.31 - MySQL Community Server (GPL)
-- Server OS:                    Linux
-- HeidiSQL Version:             10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for boilerplate_db
CREATE DATABASE IF NOT EXISTS `boilerplate_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `boilerplate_db`;

-- Dumping structure for table boilerplate_db.Tweets
CREATE TABLE IF NOT EXISTS `Tweets` (
  `tweet_id` int(11) NOT NULL AUTO_INCREMENT,
  `TEXT` varchar(256) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`tweet_id`),
  KEY `FK_TweetUsers` (`user_id`),
  CONSTRAINT `FK_TweetUsers` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Dumping data for table boilerplate_db.Tweets: ~10 rows (approximately)
/*!40000 ALTER TABLE `Tweets` DISABLE KEYS */;
INSERT INTO `Tweets` (`tweet_id`, `TEXT`, `createdAt`, `updatedAt`, `user_id`) VALUES
	(1, 'This is my first tweet', '2020-08-08 19:56:12', '2020-08-08 19:56:12', 1),
	(2, 'This is raman\'s tweet', '2020-08-08 20:12:24', '2020-08-08 20:12:24', 2),
	(3, 'This is my second tweet', '2020-08-08 20:12:42', '2020-08-08 20:12:42', 1),
	(4, 'This is the tweet', '2020-08-08 20:28:23', '2020-08-08 20:28:23', 2),
	(5, 'This is john\'s first tweet after mutation.', '2020-08-12 09:52:06', '2020-08-12 09:52:06', 1),
	(6, 'This is john\'s second tweet after mutation.', '2020-08-12 10:11:35', '2020-08-12 10:11:35', 1),
	(7, 'Hey , this is my first tweet', '2020-08-13 08:44:36', '2020-08-13 08:44:36', 4),
	(8, 'This is my fourth tweet.', '2020-08-13 16:04:59', '2020-08-13 16:04:59', 1),
	(9, 'This is mohan\'s  second tweet.', '2020-08-14 10:38:59', '2020-08-14 10:38:59', 4),
	(10, 'This is anudeep\'s first tweet.', '2020-08-14 11:49:54', '2020-08-14 11:49:54', 6);
/*!40000 ALTER TABLE `Tweets` ENABLE KEYS */;

-- Dumping structure for table boilerplate_db.UserFollowers
CREATE TABLE IF NOT EXISTS `UserFollowers` (
  `user_id` int(11) NOT NULL,
  `followerId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`followerId`),
  KEY `followerId` (`followerId`),
  CONSTRAINT `UserFollowers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  CONSTRAINT `UserFollowers_ibfk_2` FOREIGN KEY (`followerId`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table boilerplate_db.UserFollowers: ~7 rows (approximately)
/*!40000 ALTER TABLE `UserFollowers` DISABLE KEYS */;
INSERT INTO `UserFollowers` (`user_id`, `followerId`, `createdAt`, `updatedAt`) VALUES
	(1, 3, '2020-08-14 11:17:24', '2020-08-14 11:17:24'),
	(1, 4, '2020-08-09 08:23:49', '2020-08-09 08:23:49'),
	(2, 1, '2020-08-08 20:58:47', '2020-08-08 20:58:47'),
	(2, 4, '2020-08-14 10:39:18', '2020-08-14 10:39:18'),
	(3, 1, '2020-08-09 08:15:05', '2020-08-09 08:15:05'),
	(3, 4, '2020-08-14 10:41:27', '2020-08-14 10:41:27'),
	(4, 3, '2020-08-14 11:30:46', '2020-08-14 11:30:46'),
	(4, 6, '2020-08-14 11:49:33', '2020-08-14 11:49:33');
/*!40000 ALTER TABLE `UserFollowers` ENABLE KEYS */;

-- Dumping structure for table boilerplate_db.Users
CREATE TABLE IF NOT EXISTS `Users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table boilerplate_db.Users: ~6 rows (approximately)
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` (`user_id`, `username`, `PASSWORD`, `createdAt`, `updatedAt`) VALUES
	(1, 'john', 'jimmy', '2020-08-07 20:41:32', '2020-08-07 20:41:32'),
	(2, 'raman', 'passtron', '2020-08-08 20:11:40', '2020-08-08 20:11:40'),
	(3, 'ramesh', 'passtron', '2020-08-09 08:14:10', '2020-08-09 08:14:10'),
	(4, 'mohan', 'passtron', '2020-08-09 08:23:02', '2020-08-09 08:23:02'),
	(5, 'narender', 'modi', '2020-08-14 10:53:55', '2020-08-14 10:53:55'),
	(6, 'Anudeep', 'singh', '2020-08-14 11:49:17', '2020-08-14 11:49:17');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

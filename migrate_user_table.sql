-- Migrate user table from username to email-based authentication

-- Add new columns
ALTER TABLE `user` ADD COLUMN `email` VARCHAR(191) NOT NULL DEFAULT '' AFTER `id`;
ALTER TABLE `user` ADD COLUMN `name` VARCHAR(191) NOT NULL DEFAULT 'Admin' AFTER `email`;
ALTER TABLE `user` ADD COLUMN `emailVerified` TINYINT(1) NOT NULL DEFAULT 0 AFTER `name`;
ALTER TABLE `user` ADD COLUMN `image` VARCHAR(191) DEFAULT NULL AFTER `emailVerified`;

-- Migrate existing data
UPDATE `user` SET `email` = CONCAT(`username`, '@example.com') WHERE `email` = '';

-- Remove old unique key on username
ALTER TABLE `user` DROP INDEX `User_username_key`;

-- Drop old columns
ALTER TABLE `user` DROP COLUMN `username`;
ALTER TABLE `user` DROP COLUMN `password`;

-- Add unique key on email
ALTER TABLE `user` ADD UNIQUE KEY `User_email_key` (`email`);

-- Create session table
CREATE TABLE IF NOT EXISTS `session` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `token` varchar(191) NOT NULL,
  `ipAddress` varchar(191) DEFAULT NULL,
  `userAgent` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_token_key` (`token`),
  KEY `Session_userId_fkey` (`userId`),
  CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create account table
CREATE TABLE IF NOT EXISTS `account` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `accountId` varchar(191) NOT NULL,
  `providerId` varchar(191) NOT NULL,
  `accessToken` text DEFAULT NULL,
  `refreshToken` text DEFAULT NULL,
  `idToken` text DEFAULT NULL,
  `expiresAt` datetime(3) DEFAULT NULL,
  `password` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Account_providerId_accountId_key` (`providerId`, `accountId`),
  KEY `Account_userId_fkey` (`userId`),
  CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create verification table
CREATE TABLE IF NOT EXISTS `verification` (
  `id` varchar(191) NOT NULL,
  `identifier` varchar(191) NOT NULL,
  `value` varchar(191) NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Verification_identifier_value_key` (`identifier`, `value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

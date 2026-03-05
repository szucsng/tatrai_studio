-- Add new columns to User table for email verification and password reset

ALTER TABLE `User` 
ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user' AFTER `image`,
ADD COLUMN `resetToken` VARCHAR(191) NULL UNIQUE AFTER `role`,
ADD COLUMN `resetTokenExpiry` DATETIME(3) NULL AFTER `resetToken`,
ADD COLUMN `verificationToken` VARCHAR(191) NULL UNIQUE AFTER `resetTokenExpiry`;

-- Add indexes for better performance
CREATE INDEX `User_resetToken_idx` ON `User`(`resetToken`);
CREATE INDEX `User_verificationToken_idx` ON `User`(`verificationToken`);
CREATE INDEX `User_role_idx` ON `User`(`role`);

-- Update existing users to have emailVerified set appropriately
-- UPDATE `User` SET `emailVerified` = TRUE WHERE `emailVerified` IS NULL;

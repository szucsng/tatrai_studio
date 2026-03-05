-- INSTRUKCIÓK: Futtasd ezt az SQL scriptet phpMyAdmin-ban vagy MySQL kliens-ben
-- Adatbázis: s20_kepweb

-- 1. Ellenőrizd, hogy a User táblában vannak-e már ezek az oszlopok
-- Ha igen, hagyd ki azokat a sorokat

-- 2. Add hozzá az új oszlopokat
ALTER TABLE `User` ADD COLUMN IF NOT EXISTS `role` VARCHAR(191) NOT NULL DEFAULT 'user' AFTER `image`;
ALTER TABLE `User` ADD COLUMN IF NOT EXISTS `resetToken` VARCHAR(191) NULL AFTER `role`;
ALTER TABLE `User` ADD COLUMN IF NOT EXISTS `resetTokenExpiry` DATETIME(3) NULL AFTER `resetToken`;
ALTER TABLE `User` ADD COLUMN IF NOT EXISTS `verificationToken` VARCHAR(191) NULL AFTER `resetTokenExpiry`;

-- 3. Add hozzá az egyedi constraint-eket
ALTER TABLE `User` ADD UNIQUE INDEX IF NOT EXISTS `User_resetToken_key` (`resetToken`);
ALTER TABLE `User` ADD UNIQUE INDEX IF NOT EXISTS `User_verificationToken_key` (`verificationToken`);

-- 4. Add hozzá az indexeket a jobb teljesítményért
CREATE INDEX IF NOT EXISTS `User_resetToken_idx` ON `User`(`resetToken`);
CREATE INDEX IF NOT EXISTS `User_verificationToken_idx` ON `User`(`verificationToken`);
CREATE INDEX IF NOT EXISTS `User_role_idx` ON `User`(`role`);

-- 5. (Opcionális) Frissítsd a meglévő felhasználókat
-- UPDATE `User` SET `emailVerified` = TRUE WHERE `email` IS NOT NULL;

-- UTÁN: Futtasd a következő parancsot a terminálban:
-- npx prisma generate
-- npx prisma db pull

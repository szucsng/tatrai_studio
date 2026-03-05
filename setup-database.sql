-- MySQL adatbázis létrehozása a képmegosztó alkalmazáshoz

-- Adatbázis létrehozása
CREATE DATABASE IF NOT EXISTS kepweb 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Használjuk az adatbázist
USE kepweb;

-- Ellenőrizzük hogy létrejött
SHOW TABLES;

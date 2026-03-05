-- FIX: Töröljük a rossz datetime értékeket tartalmazó User rekordokat
-- Futtasd ezt phpMyAdmin-ban vagy MySQL Workbench-ben

USE kepweb;

-- Töröljük az összes felhasználót (mert rossz datetime értékekkel lett létrehozva)
TRUNCATE TABLE User;

-- Ellenőrizzük hogy üres-e
SELECT * FROM User;

# MySQL Adatbázis Beállítása

## Módszer 1: phpMyAdmin használata (XAMPP/WAMP)

1. Indítsd el a XAMPP/WAMP Control Panel-t
2. Indítsd el a MySQL szolgáltatást
3. Nyisd meg a phpMyAdmin-t: http://localhost/phpmyadmin
4. Kattints az "Új" gombra az adatbázis létrehozásához
5. Adatbázis neve: `kepweb`
6. Karakterkódolás: `utf8mb4_unicode_ci`
7. Kattints a "Létrehozás" gombra

## Módszer 2: MySQL Workbench

1. Nyisd meg a MySQL Workbench-et
2. Csatlakozz a local MySQL szerverhez
3. Futtasd le a `setup-database.sql` fájl tartalmát
4. Vagy egyszerűen futtasd ezt a parancsot:
   ```sql
   CREATE DATABASE IF NOT EXISTS kepweb 
   CHARACTER SET utf8mb4 
   COLLATE utf8mb4_unicode_ci;
   ```

## Módszer 3: Terminálból (ha telepítve van a MySQL CLI)

```bash
# Windows (ha a MySQL bin mappa a PATH-ban van)
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p -e "CREATE DATABASE IF NOT EXISTS kepweb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Vagy ha XAMPP-et használsz
"C:\xampp\mysql\bin\mysql.exe" -u root -e "CREATE DATABASE IF NOT EXISTS kepweb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

## Módszer 4: HeidiSQL (ha telepítve van)

1. Nyisd meg a HeidiSQL-t
2. Csatlakozz a MySQL szerverhez
3. Jobb klikk a bal oldali fán
4. "Create new" -> "Database"
5. Név: `kepweb`
6. Collation: `utf8mb4_unicode_ci`

## Ellenőrzés

Miután létrehoztad az adatbázist, futtasd le a migrációt:

```bash
npx prisma migrate dev
```

Ez létrehozza a táblákat (User, Event, Image) az adatbázisban.

## Kapcsolat beállítása

A `.env` fájlban módosítsd a kapcsolati stringet, ha szükséges:

```env
# Alapértelmezett (nincs jelszó)
DATABASE_URL="mysql://root:@localhost:3306/kepweb"

# Ha van jelszó
DATABASE_URL="mysql://root:jelszavad@localhost:3306/kepweb"

# Ha más port
DATABASE_URL="mysql://root:@localhost:3307/kepweb"

# Ha más host
DATABASE_URL="mysql://root:@192.168.1.100:3306/kepweb"
```

## Gyakori problémák

### "Access denied for user 'root'@'localhost'"
- Módosítsd a jelszót a `.env` fájlban
- Vagy hozz létre új felhasználót phpMyAdmin-ban

### "Can't connect to MySQL server"
- Ellenőrizd, hogy fut-e a MySQL szolgáltatás
- Ellenőrizd a portot (általában 3306)

### "Unknown database 'kepweb'"
- Az adatbázis még nem lett létrehozva
- Kövesd a fenti lépéseket az adatbázis létrehozásához

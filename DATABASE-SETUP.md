# MySQL adatbázis beállítása

A projekt **egyetlen sémát** használ, amelyet a Prisma kezel. A séma forrása a [`prisma/schema.prisma`](prisma/schema.prisma), a részletes útmutató a [`database/README.md`](database/README.md).

## 1. Adatbázis létrehozása

Hozz létre egy üres MySQL adatbázist `utf8mb4_unicode_ci` karakterkészlettel. Ezt megteheted a hoszting panelben, phpMyAdminban vagy MySQL Workbenchben.

```sql
CREATE DATABASE IF NOT EXISTS `ADATBAZIS`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

## 2. Kapcsolat beállítása

A `.env` fájlban add meg a kapcsolatot. A jelszóban lévő speciális karaktereket URL-kódolni kell (pl. `@` → `%40`, `!` maradhat).

```env
DATABASE_URL="mysql://FELHASZNALO:JELSZO@HOST:3306/ADATBAZIS"
```

## 3. Táblák létrehozása

```bash
npm install
npm run db:init
npm run db:generate
```

- `npm run db:init` üres adatbázison lefuttatja a migrációkat, meglévő adatbázison csak a hiányzó migrációkat.
- `npm run db:generate` legenerálja a Prisma Clientet.

Ugyanez automatikusan lefut a Pterodactyl indulásakor, ha a startup commandban szerepel a `npm run db:init`.

Ha inkább egyetlen SQL fájlt importálnál, töltsd be a `database/schema.sql` fájlt phpMyAdminban, vagy:

```bash
mysql -u FELHASZNALO -p ADATBAZIS < database/schema.sql
```

A két módszert **ne** kombináld ugyanazon az adatbázison.

## 4. Ellenőrzés

```bash
npm run db:studio
```

Vagy listázd a táblákat:

```sql
SHOW TABLES;
```

Elvárt táblák: `User`, `Session`, `Account`, `Verification`, `Event`, `Image`, `EventOrganizer`, valamint a Prisma belső `_prisma_migrations` táblája.

## Gyakori hibák

### „Access denied for user”
A `.env`-ben lévő felhasználónév vagy jelszó nem megfelelő. A speciális karaktereket URL-kódolni kell.

### „Can't connect to MySQL server”
Ellenőrizd a hostot és a portot. Pterodactyl alatt a `10.8.0.1` típusú belső cím csak a konténerből érhető el.

### „Unknown database”
Az adatbázis még nem létezik, vagy a `DATABASE_URL`-ben rossz a név.

### „Table already exists”
Az adatbázisban már vannak táblák. Üres adatbázison futtasd a migrációt, vagy használd a `database/schema.sql`-t külön, ne mindkettőt.

### „P3009 / failed migrations”
Korábbi, félbemaradt migráció van rögzítve. Friss, üres adatbázison ez nem fordul elő; ha mégis, ellenőrizd a `_prisma_migrations` táblát.

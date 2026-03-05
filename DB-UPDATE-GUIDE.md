# 🔧 Adatbázis Frissítés Útmutató

## Probléma
A Prisma nem tud kapcsolódni az adatbázishoz a speciális karakterek miatt a jelszóban.

## Megoldás - phpMyAdmin használata

### 1. lépés: Nyisd meg phpMyAdmin-t
- URL: A szerver phpMyAdmin címe
- Bejelentkezés: `u20_eqIJNUeShB` / jelszó
- Válaszd ki az `s20_kepweb` adatbázist

### 2. lépés: Futtasd az SQL script-et
1. Kattints az "SQL" tab-ra
2. Másold be a `MANUAL-DB-UPDATE.sql` fájl tartalmát
3. Kattints a "Go" vagy "Végrehajtás" gombra

### 3. lépés: Ellenőrzés
Ellenőrizd a User táblát, hogy megjelentek-e az új oszlopok:
- `role` (VARCHAR, DEFAULT 'user')
- `resetToken` (VARCHAR, NULL, UNIQUE)
- `resetTokenExpiry` (DATETIME)
- `verificationToken` (VARCHAR, NULL, UNIQUE)

### 4. lépés: Prisma újragenerálása
Terminálban:
```bash
npx prisma db pull
npx prisma generate
```

### 5. lépés: TypeScript hibák megszűnnek
Indítsd újra a dev szervert:
```bash
npm run dev
```

## Alternatív Megoldás - MySQL Workbench

Ha van MySQL Workbench telepítve:
1. Kapcsolódj az adatbázishoz: `127.0.0.1:3306`
2. User: `u20_eqIJNUeShB`
3. Database: `s20_kepweb`
4. Futtasd a `MANUAL-DB-UPDATE.sql` script-et

## Gyors Teszt SQL (csak ellenőrzés)

```sql
-- Nézd meg a User tábla struktúráját
DESCRIBE `User`;

-- Ellenőrizd az új oszlopokat
SELECT 
  COLUMN_NAME, 
  DATA_TYPE, 
  IS_NULLABLE, 
  COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'User' 
  AND TABLE_SCHEMA = 's20_kepweb'
  AND COLUMN_NAME IN ('role', 'resetToken', 'resetTokenExpiry', 'verificationToken');
```

## Mi történik a háttérben?

1. **Új oszlopok hozzáadása**: A User táblához 4 új oszlop
2. **UNIQUE constraint**: resetToken és verificationToken egyediek
3. **Indexek**: Gyorsabb keresés a token mezőkön
4. **DEFAULT értékek**: role mezőnek 'user' az alapértelmezett

## Problémamegoldás

### "Duplicate column" hiba
Ha már léteznek az oszlopok, ne futtasd újra a scriptet, csak ezt:
```bash
npx prisma db pull
npx prisma generate
```

### Kapcsolódási hiba
Ellenőrizd az `.env` fájlt:
```
DATABASE_URL="mysql://u20_eqIJNUeShB:ksdxHxPXj!gENW7%2B77pRCZst@127.0.0.1:3306/s20_kepweb"
```

### TypeScript hibák nem szűnnek meg
1. Töröld a `node_modules/.prisma` mappát
2. Futtasd: `npx prisma generate`
3. Indítsd újra a TypeScript szervert (VS Code-ban: Ctrl+Shift+P → "Restart TS Server")

---

**Miután kész van az adatbázis frissítés, minden TypeScript hiba megszűnik! ✅**

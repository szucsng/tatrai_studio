# Adatbázis

A projekt **egyetlen sémaforrása** a [`prisma/schema.prisma`](../prisma/schema.prisma). A MySQL adatbázist a Prisma kezeli, a weboldal ezen a sémán keresztül éri el az adatokat.

## Fájlok

- `prisma/schema.prisma` – a séma forrása (User, Session, Account, Verification, Event, Image, EventOrganizer)
- `prisma/migrations/` – a verziózott migrációk; éles környezetben ezek futnak le
- `database/schema.sql` – ugyanaz a séma egyben, kézi importáláshoz (phpMyAdmin, MySQL CLI)
- `database/legacy/` – régi, egyszeri SQL scriptek és dumpok; helyi archívum, a git nem követi

## Beállítás üres adatbázison

1. Hozz létre egy üres MySQL adatbázist `utf8mb4_unicode_ci` karakterkészlettel.
2. Állítsd be a `.env` fájlban:

   ```env
   DATABASE_URL="mysql://FELHASZNALO:JELSZO@HOST:3306/ADATBAZIS"
   ```

   A jelszóban lévő speciális karaktereket URL-kódolni kell (pl. `@` → `%40`).

3. Telepítsd a függőségeket, majd inicializáld az adatbázist:

   ```bash
   npm install
   npm run db:init
   ```

   A `db:init` a Prisma Clientet is újragenerálja a friss sémából. Emellett megnézi, hogy üres-e az adatbázis:
   - üres: lefuttatja a migrációkat,
   - már van `_prisma_migrations`: lefuttatja a hiányzó migrációkat,
   - `database/schema.sql`-ből importált táblák vannak: kihagyja a migrációt.

   Ha inkább egyetlen SQL fájlt importálnál, töltsd be a `database/schema.sql` fájlt phpMyAdminban vagy:

   ```bash
   mysql -u FELHASZNALO -p ADATBAZIS < database/schema.sql
   ```

   A két módszer közül **csak az egyiket** használd.

## Parancsok

| Parancs | Mit csinál |
| --- | --- |
| `npm run db:init` | Ha üres a DB, létrehozza a táblákat; futtatja a migrációkat és újragenerálja a Prisma Clientet (induláskor ez ajánlott) |
| `npm run db:migrate` | A meglévő migrációk alkalmazása (éles környezet) |
| `npm run db:push` | A séma szinkronizálása migráció nélkül (fejlesztéshez, gyors) |
| `npm run db:generate` | Prisma Client újragenerálása |
| `npm run db:studio` | Prisma Studio az adatok böngészéséhez |
| `npm run db:test` | MySQL kapcsolat és a táblák ellenőrzése |

A `npm run build` a `prebuild` lépésben automatikusan lefuttatja a `prisma generate`-t, így a build mindig a friss sémát használja.

## Automatikus inicializálás induláskor

A `npm start` automatikusan lefuttatja a `db:init`-et, mielőtt elindítja a Next szervert. Így a Pterodactyl startup commandban nem kell külön szerepeltetni:

```bash
bash -c "git pull --ff-only origin main && npm install --include=dev && npm run build && exec npm start"
```

Ha a build előtt is inicializálni szeretnéd, a `db:init` oda is beírható, de a `start` miatt ez nem kötelező.

## Séma módosítása

1. Módosítsd a `prisma/schema.prisma` fájlt.
2. Fejlesztés közben:

   ```bash
   npx prisma migrate dev --name rovid_leiras
   ```

3. Commitold a létrejött migrációt a `prisma/migrations/` mappából.
4. Éles környezetben:

   ```bash
   npm run db:migrate
   npm run db:generate
   ```

Ne módosítsd kézzel a táblákat phpMyAdminban, mert a Prisma sémától eltérő állapot jön létre.

## Hibakeresés

Ha az alkalmazás azt írja, hogy egy tábla nem létezik (pl. `The table Event does not exist`):

1. Futtasd a szerveren:

   ```bash
   npm run db:init
   ```

   A parancs kiírja az adatbázis nevét, a hostot és a meglévő táblákat.

2. Ellenőrizd, hogy ugyanaz az adatbázisnév szerepel-e a `.env` `DATABASE_URL` értékében, mint amit a `db:init` kiírt.

3. Ha a `db:init` szerint vannak migrációk, de a táblák hiányoznak, a migrációs history sérült. Ilyenkor ürítsd a friss adatbázist, majd futtasd újra a `db:init`-et, vagy importáld a `database/schema.sql`-t.

4. A `npm run db:test` paranccsal külön is ellenőrizhető a kapcsolat és a hiányzó táblák listája.

## Régi fájlok

A gyökérben korábban szétszórt SQL fájlok (`setup-database.sql`, `add-email-features.sql`, `MANUAL-DB-UPDATE.sql`, `migrate_user_table.sql`, `fix-database.sql`, `kepweb.sql`, `dev.db`) a `database/legacy/` mappába kerültek, és a git már nem követi őket. Új telepítéshez nem szükségesek.

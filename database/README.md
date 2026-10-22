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

3. Telepítsd a függőségeket, majd hozd létre a táblákat:

   ```bash
   npm install
   npm run db:migrate
   npm run db:generate
   ```

   Ha a Prisma migráció helyett inkább egyben importálnád a sémát, töltsd be a `database/schema.sql` fájlt phpMyAdminban vagy:

   ```bash
   mysql -u FELHASZNALO -p ADATBAZIS < database/schema.sql
   ```

   A két módszer közül **csak az egyiket** használd.

## Parancsok

| Parancs | Mit csinál |
| --- | --- |
| `npm run db:migrate` | A meglévő migrációk alkalmazása (éles környezet, ajánlott) |
| `npm run db:push` | A séma szinkronizálása migráció nélkül (fejlesztéshez, gyors) |
| `npm run db:generate` | Prisma Client újragenerálása |
| `npm run db:studio` | Prisma Studio az adatok böngészéséhez |
| `npm run db:test` | MySQL kapcsolat és a táblák ellenőrzése |

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

## Régi fájlok

A gyökérben korábban szétszórt SQL fájlok (`setup-database.sql`, `add-email-features.sql`, `MANUAL-DB-UPDATE.sql`, `migrate_user_table.sql`, `fix-database.sql`, `kepweb.sql`, `dev.db`) a `database/legacy/` mappába kerültek, és a git már nem követi őket. Új telepítéshez nem szükségesek.

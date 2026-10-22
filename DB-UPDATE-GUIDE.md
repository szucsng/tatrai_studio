# Adatbázis séma módosítása

A séma **egyetlen forrása** a [`prisma/schema.prisma`](prisma/schema.prisma). A táblákat ne módosítsd kézzel phpMyAdminban vagy MySQL Workbenchben, mert a Prisma sémától eltérő állapot alakul ki.

## Fejlesztés közben

1. Módosítsd a `prisma/schema.prisma` fájlt.
2. Hozz létre migrációt:

   ```bash
   npx prisma migrate dev --name rovid_leiras
   ```

3. Generáld újra a klienst:

   ```bash
   npm run db:generate
   ```

4. Commitold a `prisma/migrations/` alatt létrejött mappát.

## Éles környezetben

```bash
npm run db:migrate
npm run db:generate
```

A `db:migrate` csak a már verziózott migrációkat futtatja, ezért éles adatbázison ez a biztonságos út.

## Ha még nincs migráció

Új, üres adatbázison a teljes sémát a `database/schema.sql` fájlból is létrehozhatod. Ez ugyanaz, mint a migrations mappa tartalma, csak egyben.

## Régi, kézi SQL fájlok

A korábbi `add-email-features.sql`, `MANUAL-DB-UPDATE.sql`, `migrate_user_table.sql`, `fix-database.sql` és hasonló scriptek a `database/legacy/` mappába kerültek, és már nem részei a telepítésnek. Ne futtasd őket az új sémán.

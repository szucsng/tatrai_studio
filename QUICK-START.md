# 🚀 Gyors Telepítési Útmutató

## 1. Adatbázis előkészítése

A táblákat a Prisma hozza létre az egységes sémából:

```bash
npm run db:init
```

Üres adatbázison migráció nélkül is szinkronizálhatod:

```bash
npm run db:push
```

Részletek: [`database/README.md`](database/README.md).

## 2. SMTP Konfiguráció

Hozd létre a `.env` fájlt a projekt root-ban:

```env
# SMTP Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="your-email@gmail.com"
```

### Gmail App Password Létrehozása:

1. Google Account → https://myaccount.google.com/
2. Security → 2-Step Verification (be kell kapcsolni)
3. Security → App passwords
4. Választ: "Mail" és "Other" (nevezd: Fotógaléria)
5. Másold ki a 16 karakteres jelszót
6. Illeszd be az `SMTP_PASS`-ba

## 3. Prisma Client Újragenerálása

```bash
npx prisma generate
```

## 4. Alkalmazás Újraindítása

```bash
npm run dev
```

## 5. Tesztelés

1. Nyisd meg: http://localhost:5102/admin/login
2. Kattints: "Elfelejtett jelszó?"
3. Add meg az email címed
4. Ellenőrizd az emailt
5. Kattints a linkre
6. Állíts be új jelszót
7. Jelentkezz be

## Gyakori Hibák

### Email nem érkezik meg

**Probléma**: Az email nem jön meg

**Megoldás**:
- Ellenőrizd a spam mappát
- Nézd meg a server console-t hibákért
- Gmail esetén használj App Password-ot
- Teszteld az SMTP beállításokat: https://www.smtper.net/

### Adatbázis hiba

**Probléma**: hiányzó táblák vagy oszlopok

**Megoldás**:
```bash
npm run db:init
```

### Token lejárt

**Probléma**: "Érvénytelen vagy lejárt token" hiba

**Megoldás**:
- Reset token 1 óra után lejár
- Verification token 24 óra után lejár  
- Kérj új linket

## Következő Lépések

1. ✅ Adatbázis frissítve
2. ✅ SMTP beállítva
3. ✅ App újraindítva
4. 🎉 Használhatod az új funkciókat!

### Admin Dashboard Funkciók:

- **Dashboard**: Statisztikák megtekintése
- **Események**: Események és képek kezelése
- **Profil**: Profil és jelszó módosítása

### Új Biztonsági Funkciók:

- Email megerősítés
- Jelszó visszaállítás
- Biztonságos tokenek
- Hash-elt jelszavak

---

**Dokumentáció**: Lásd `ADMIN-PANEL-README.md` és `IMPLEMENTATION-SUMMARY.md`

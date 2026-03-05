# Admin Panel - Teljes funkciókkal

## Új funkciók

### ✅ Implementált funkciók

1. **Email hitelesítés**
   - Email megerősítés regisztráció után
   - Verification token rendszer
   - Üdvözlő email automatikus küldése

2. **Jelszó visszaállítás**
   - "Elfelejtett jelszó" funkció
   - Biztonságos reset token
   - Email értesítés jelszó módosításról

3. **Modern Admin Dashboard**
   - Dashboard tab: Statisztikák és gyors műveletek
   - Események tab: Teljes események kezelése
   - Profil tab: Profil és jelszó módosítás
   - Valós idejű statisztikák (események, képek, új események)

4. **Továbbfejlesztett bejelentkezés**
   - Elfelejtett jelszó link
   - Email verification értesítés
   - Email újraküldési lehetőség
   - Modern UI animációkkal

## Telepítési lépések

### 1. Packages telepítése

```bash
npm install nodemailer bcryptjs
npm install --save-dev @types/nodemailer @types/bcryptjs
```

### 2. Adatbázis migráció

Először frissítsd az adatbázis kapcsolatot a `.env` fájlban:

```bash
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
```

Majd futtasd a migrációt:

```bash
npx prisma migrate dev --name add_email_features
```

Vagy ha már létező adatbázissal dolgozol:

```bash
npx prisma db push
```

### 3. SMTP beállítások

Másold le a `.env.example` fájlt `.env.local` néven és add meg az SMTP beállításokat:

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-specific-password"
SMTP_FROM="your-email@gmail.com"
```

#### Gmail használata esetén:

1. Menj a Google Account beállításokhoz
2. Biztonság > 2 lépéses azonosítás
3. Alkalmazásjelszavak létrehozása
4. Válaszd ki az "Egyéb" opciót és nevezd el (pl. "Fotógaléria")
5. Másold be a generált jelszót az `SMTP_PASS`-ba

### 4. NextAuth/Better Auth beállítások

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="hosszu-random-secret-kulcs"
BETTER_AUTH_SECRET="masik-hosszu-random-secret"
BETTER_AUTH_URL="http://localhost:3000"
```

Secret kulcsok generálása:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. Prisma Client újragenerálása

```bash
npx prisma generate
```

### 6. Alkalmazás indítása

```bash
npm run dev
```

## API Endpointok

### Email Hitelesítés

- `POST /api/auth/resend-verification` - Email verification újraküldése
- `GET /api/auth/verify-email?token=xxx` - Email megerősítése

### Jelszó visszaállítás

- `POST /api/auth/forgot-password` - Jelszó visszaállítási link kérése
- `POST /api/auth/reset-password` - Új jelszó beállítása tokennel

### Admin műveletek

- `GET /api/admin/events` - Események listázása
- `POST /api/admin/events` - Új esemény létrehozása
- `PUT /api/admin/events/:id` - Esemény módosítása
- `DELETE /api/admin/events/:id` - Esemény törlése
- `DELETE /api/admin/events/:id/images/:imageId` - Kép törlése

## Oldalak

### Publikus
- `/` - Főoldal
- `/galeria` - Galéria megtekintés
- `/galeria/:id` - Esemény részletei

### Admin
- `/admin/login` - Admin bejelentkezés
- `/admin` - Admin dashboard (3 tab)
- `/admin/forgot-password` - Elfelejtett jelszó
- `/admin/reset-password?token=xxx` - Jelszó visszaállítás
- `/admin/verify-email?token=xxx` - Email megerősítés

## Adatbázis séma változások

Az új `User` modell mezői:

```prisma
model User {
  id                 String    @id @default(cuid())
  email              String    @unique
  name               String
  emailVerified      Boolean   @default(false)
  image              String?
  role               String    @default("user")
  resetToken         String?   @unique
  resetTokenExpiry   DateTime?
  verificationToken  String?   @unique
  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt
  sessions           Session[]
  accounts           Account[]
}
```

## Használat

### Admin létrehozása

Ha még nincs admin felhasználód:

```bash
npm run create-admin
```

Vagy használd a setup oldalt: `http://localhost:3000/setup`

### Email sablonok

Az email sablonok a `src/lib/email.ts` fájlban találhatók:
- Jelszó visszaállítás email
- Email megerősítés email  
- Üdvözlő email

Minden email HTML formátumú, modern design-nal és gombokkal.

### Statisztikák

Az admin dashboard automatikusan számítja:
- Összes esemény száma
- Összes kép száma
- Új események az elmúlt 30 napban

## Biztonság

- Jelszavak bcrypt-tel hash-elve
- Reset tokenek 1 óra után lejárnak
- Verification tokenek 24 óra után lejárnak
- CSRF védelem
- SQL injection védelem (Prisma ORM)
- XSS védelem (React)

## Fejlesztés

### Email tesztelés development módban

Használj email tesztelő szolgáltatást:
- [Mailtrap](https://mailtrap.io/) - Ingyenes development SMTP
- [Ethereal Email](https://ethereal.email/) - Ideiglenes email postaláda

### Production

Production környezetben használj megbízható SMTP szolgáltatást:
- SendGrid
- Amazon SES
- Mailgun
- Postmark

## Troubleshooting

### Email nem érkezik meg

1. Ellenőrizd az SMTP beállításokat
2. Gmail esetén használj alkalmazásjelszót (2FA szükséges)
3. Ellenőrizd a spam mappát
4. Nézd meg a szerver console-t hibákért

### Migráció hiba

Ha a migráció nem fut le:

```bash
npx prisma db push --force-reset  # FIGYELEM: Törli az adatokat!
```

Vagy:

```bash
npx prisma migrate reset
```

### Session hiba

Ha session problémák vannak:

```bash
npx prisma generate
npm run dev
```

## Következő lépések

További funkciók amit hozzáadhatsz:
- [ ] Kétfaktoros hitelesítés (2FA)
- [ ] OAuth bejelentkezés (Google, Facebook)
- [ ] Aktivitási napló
- [ ] Felhasználó kezelés (több admin)
- [ ] Email értesítések új eseményekről
- [ ] Képek automatikus optimalizálása
- [ ] Bulk műveletek (több esemény törlése)
- [ ] Exportálás (események listája CSV/Excel)
- [ ] Keresés és szűrés
- [ ] Dark mode

## Support

Ha kérdésed van vagy hibát találsz, készíts egy issue-t vagy írj!

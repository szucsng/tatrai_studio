# Képmegosztó Alkalmazás

Modern Next.js alapú képmegosztó alkalmazás eseményekkel, admin felülettel és nagy felbontású képek kezelésével.

## Funkciók

- 🏠 **Főoldal** - Személyes bemutatkozás
- 🖼️ **Képgaléria** - Eseményekre bontva
- 🔍 **Kép nagyítás** - Zoom funkcióval
- 🔐 **Admin felület** - Biztonságos bejelentkezéssel
- 📤 **Több kép feltöltése** - Egyszerre több kép feltöltése
- 📱 **Reszponzív dizájn** - Minden eszközön jól működik
- 🗄️ **SQLite adatbázis** - Egyszerű, gyors adattárolás

## Technológiák

- **Next.js 16** - React keretrendszer
- **TypeScript** - Típusbiztonság
- **Tailwind CSS** - Modern styling
- **Prisma** - ORM adatbázis kezeléshez
- **NextAuth.js** - Autentikáció
- **Yet Another React Lightbox** - Kép nagyítás
- **SQLite** - Adatbázis

## Telepítés és Indítás

### 1. Függőségek telepítése
```bash
npm install
```

### 2. Adatbázis előkészítése
Az adatbázis már inicializálva van, de ha újra kellene:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 3. Admin felhasználó létrehozása

A fejlesztői szerver elindítása után hozz létre egy admin felhasználót az API segítségével:

```bash
# Indítsd el a szervert
npm run dev
```

Majd egy másik terminálban vagy Postman-nel küldj egy POST kérést:

```bash
curl -X POST http://localhost:3000/api/setup/create-admin \\
  -H "Content-Type: application/json" \\
  -d "{\"username\":\"admin\",\"password\":\"admin123\",\"secret\":\"create-admin-secret-2024\"}"
```

Vagy használd a böngészőt és a következő JavaScript kódot a console-ban (F12):

```javascript
fetch('http://localhost:3000/api/setup/create-admin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'admin',
    password: 'admin123',
    secret: 'create-admin-secret-2024'
  })
}).then(res => res.json()).then(console.log)
```

### 4. Alkalmazás indítása

```bash
npm run dev
```

Az alkalmazás elérhető lesz: [http://localhost:3000](http://localhost:3000)

## Használat

### Főoldal
- Látogasd meg a főoldalt: `http://localhost:3000`
- Itt találod a bemutatkozást és a navigációt

### Galéria
- Kattints a "Galéria" menüpontra vagy látogasd meg: `http://localhost:3000/galeria`
- Az események listájából válaszd ki a kívánt eseményt
- Kattints bármelyik képre a nagyításhoz és navigáláshoz

### Admin Felület

1. **Bejelentkezés**
   - Menj a `http://localhost:3000/admin/login` címre
   - Jelentkezz be a létrehozott admin felhasználóval:
     - Felhasználónév: `admin`
     - Jelszó: `admin123`

2. **Esemény létrehozása**
   - Az admin felületen töltsd ki az űrlapot:
     - Esemény neve (kötelező)
     - Leírás (opcionális)
     - Dátum
   - Válassz ki egy vagy több képet (többszörös kiválasztás támogatott)
   - Kattints a "Esemény létrehozása" gombra

3. **Kijelentkezés**
   - Kattints a "Kijelentkezés" gombra a navigációs sávban

## Fájlstruktúra

```
kepweb/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   │   └── page.tsx          # Admin bejelentkezés
│   │   │   └── page.tsx               # Admin felület
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   └── events/
│   │   │   │       └── route.ts       # Esemény létrehozás API
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts       # NextAuth konfiguráció
│   │   │   ├── events/
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts       # Esemény lekérés API
│   │   │   └── setup/
│   │   │       └── create-admin/
│   │   │           └── route.ts       # Admin létrehozás API
│   │   ├── galeria/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx           # Esemény részletek
│   │   │   └── page.tsx               # Galéria lista
│   │   └── page.tsx                   # Főoldal
│   ├── lib/
│   │   ├── auth.ts                    # NextAuth konfiguráció
│   │   └── prisma.ts                  # Prisma kliens
│   ├── middleware.ts                  # Route védelem
│   └── types/
│       └── next-auth.d.ts             # NextAuth típusok
├── prisma/
│   ├── schema.prisma                  # Adatbázis séma
│   └── dev.db                         # SQLite adatbázis
├── public/
│   └── uploads/                       # Feltöltött képek
└── README.md
```

## Környezeti változók

A `.env` fájlban:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production-please"
NEXTAUTH_URL="http://localhost:3000"
```

**Fontos:** Éles környezetben mindenképpen változtasd meg a `NEXTAUTH_SECRET` értékét egy erős, véletlenszerű stringre!

## Adatbázis séma

### User
- id: String (cuid)
- username: String (unique)
- password: String (hashed)

### Event
- id: String (cuid)
- name: String
- description: String?
- date: DateTime
- images: Image[]

### Image
- id: String (cuid)
- filename: String
- path: String
- eventId: String

## Fejlesztés

### Adatbázis módosítása

Ha módosítod a Prisma sémát:

```bash
npx prisma migrate dev --name your_migration_name
npx prisma generate
```

### Build éles környezethez

```bash
npm run build
npm start
```

## Testreszabás

### Főoldal szöveg
Módosítsd a `src/app/page.tsx` fájlban a személyes bemutatkozást:
- Cseréld le a `[Neved vagyok]` szöveget
- Írd át a bekezdéseket saját szövegedre

### Admin létrehozás titkos kulcs
A `src/app/api/setup/create-admin/route.ts` fájlban módosítsd:
```typescript
if (secret !== 'create-admin-secret-2024') {
```

### Styling
A Tailwind CSS osztályokat módosíthatod bármelyik komponensben.

## Biztonság

- Jelszavak bcrypt-tel hashelve
- Admin felület védve middleware-rel
- Session-alapú autentikáció
- Csak bejelentkezett felhasználók hozhatnak létre eseményeket

## Gyakori problémák

### "Nincs bejelentkezve" hiba
- Ellenőrizd, hogy bejelentkeztél-e az admin felületre
- Próbáld meg újra bejelentkezni

### Képek nem töltődnek be
- Ellenőrizd, hogy a `public/uploads` mappa létezik és írható
- Győződj meg róla, hogy a képek megfelelő formátumúak (jpg, png, webp)

### Adatbázis hiba
- Futtasd újra: `npx prisma generate`
- Ellenőrizd a `DATABASE_URL` értékét a `.env` fájlban

## Licenc

Ez egy egyedi projekt, szabadon használható és módosítható.

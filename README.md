# Tatrái Stúdió – Képgaléria Alkalmazás

Modern Next.js alapú fotógaléria alkalmazás eseménykezeléssel, admin felülettel, automatikus thumbnail generálással és email alapú hitelesítéssel.

## Funkciók

- 🏠 **Főoldal** – Személyes/stúdiós bemutatkozás interaktív 3D háttérrel (Three.js)
- 🖼️ **Képgaléria** – Eseményekre bontva, lightbox nézettel
- 🔍 **Kép nagyítás** – Yet Another React Lightbox alapú zoom és navigáció
- 🔐 **Admin felület** – Email + jelszó alapú bejelentkezéssel (Better Auth)
- 📧 **Email hitelesítés** – Regisztrációkor email-megerősítés, jelszó-visszaállítás
- 📤 **Tömeges képfeltöltés** – Egyszerre több kép feltöltése, automatikus thumbnail és medium verzió generálással (Sharp)
- 🖼️ **Automatikus thumbnail** – 300×200 és 800px szélességű medium verzió minden képhez
- 👥 **Többfelhasználós admin** – Szerepkör alapú jogosultságok (admin / user)
- 📱 **Reszponzív dizájn** – Tailwind CSS, minden eszközön
- 🗄️ **MySQL adatbázis** – Prisma ORM-mel

## Technológiák

| Csomag | Verzió | Leírás |
|---|---|---|
| Next.js | 16 | React keretrendszer (App Router) |
| TypeScript | 5 | Típusbiztonság |
| Tailwind CSS | 4 | Utility-first styling |
| Prisma | 5 | ORM adatbázis kezeléshez |
| Better Auth | 1.5 | Email/jelszó alapú autentikáció |
| MySQL2 | 3 | Adatbázis driver |
| Sharp | 0.34 | Képfeldolgozás, thumbnail generálás |
| Yet Another React Lightbox | 3 | Kép nagyítás / galériamegjelenítő |
| Three.js | 0.167 | 3D háttér animáció |
| Nodemailer | 8 | Email küldés |
| Lucide React | 0.577 | Ikonok |

## Telepítés és Indítás

### 1. Függőségek telepítése
```bash
npm install
```

### 2. Környezeti változók beállítása

Hozz létre egy `.env` fájlt a projekt gyökerében:

```env
# MySQL adatbázis
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DBNAME"

# Better Auth
BETTER_AUTH_SECRET="valami-eros-titok-valtoztasd-meg"
BETTER_AUTH_URL="http://localhost:5102"

# Email (SMTP)
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="user@example.com"
SMTP_PASS="jelszo"
SMTP_FROM="noreply@example.com"

# Admin setup (egyszeri admin létrehozáshoz)
ADMIN_SETUP_SECRET="admin-setup-secret"
```

### 3. Adatbázis előkészítése

A teljes sémát a Prisma kezeli. Üres adatbázison:

```bash
npm run db:init
npm run db:generate
```

A `db:init` üres adatbázison létrehozza a táblákat, meglévő adatbázison csak a hiányzó migrációkat futtatja.

Ha inkább egy SQL fájlt importálnál, használd a `database/schema.sql`-t. Részletek: [`database/README.md`](database/README.md).

### 4. Admin felhasználó létrehozása

Nyisd meg a [http://localhost:5102/setup](http://localhost:5102/setup) oldalt, és add meg az emailt, jelszót, nevet, valamint a `.env` fájlban lévő `ADMIN_SETUP_SECRET` értékét. Az oldal admin szerepkörrel hozza létre az első felhasználót.

Vagy az API-n keresztül (szerver futása közben):

```bash
curl -X POST http://localhost:5102/api/setup/create-admin \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Admin\",\"email\":\"admin@example.com\",\"password\":\"valtoztasd-meg\",\"secret\":\"<ADMIN_SETUP_SECRET>\"}"
```

### 5. Alkalmazás indítása

```bash
npm run dev
```

Az alkalmazás elérhető: [http://localhost:5102](http://localhost:5102)

## Használat

### Főoldal
- `http://localhost:5102` – bemutatkozó oldal 3D animált háttérrel

### Galéria
- `http://localhost:5102/galeria` – összes esemény listája
- Eseményre kattintva megnyílnak a képek lightbox nézetben

### Admin Felület

1. **Bejelentkezés:** `http://localhost:5102/admin/login`
2. **Esemény kezelés:** új esemény létrehozása, meglévők szerkesztése/törlése
3. **Képfeltöltés:** eseményhez képek feltöltése (JPEG, PNG, WebP) – automatikusan generálódik thumbnail és medium verzió
4. **Felhasználók:** admin szintű felhasználók kezelése
5. **Profil:** saját jelszó és profiladatok módosítása

## Fájlstruktúra

```
tatrai_studio/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── login/               # Admin bejelentkezés
│   │   │   ├── forgot-password/     # Jelszó-visszaállítás kérés
│   │   │   ├── reset-password/      # Jelszó-visszaállítás
│   │   │   ├── verify-email/        # Email megerősítés
│   │   │   └── page.tsx             # Admin főoldal
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   ├── events/          # Esemény CRUD API
│   │   │   │   ├── profile/         # Profil frissítés API
│   │   │   │   └── users/           # Felhasználó kezelés API
│   │   │   ├── auth/                # Better Auth endpoint
│   │   │   │   ├── forgot-password/ # Jelszó-visszaállítás email
│   │   │   │   ├── reset-password/  # Új jelszó beállítás
│   │   │   │   ├── resend-verification/ # Megerősítő email újraküldés
│   │   │   │   ├── session/         # Session lekérés
│   │   │   │   └── verify-email/    # Email megerősítés
│   │   │   ├── events/[id]/         # Publikus esemény lekérés
│   │   │   ├── setup/create-admin/  # Egyszeri admin létrehozás
│   │   │   └── video/               # Videó proxy
│   │   ├── galeria/
│   │   │   ├── [id]/                # Esemény részletek + képek
│   │   │   └── page.tsx             # Galéria lista
│   │   ├── setup/                   # Setup oldal
│   │   └── page.tsx                 # Főoldal
│   ├── components/
│   │   ├── ColorBends.jsx           # Three.js 3D háttér
│   │   ├── Footer.tsx               # Lábléc
│   │   ├── Icons.tsx                # SVG ikonok
│   │   ├── ImageCard.tsx            # Galéria képkártya
│   │   └── ThemeToggle.tsx          # Témaváltó
│   ├── lib/
│   │   ├── auth.ts                  # Better Auth konfiguráció
│   │   ├── auth-client.ts           # Kliens oldali auth
│   │   ├── email.ts                 # Nodemailer email küldés
│   │   └── prisma.ts                # Prisma kliens
│   └── types/
│       └── next-auth.d.ts           # Típusdefiníciók
├── prisma/
│   ├── schema.prisma                # Az adatbázis-séma egyetlen forrása
│   └── migrations/                  # Prisma migrációk
├── database/
│   ├── schema.sql                   # Egyben importálható MySQL séma
│   └── README.md                    # Adatbázis útmutató
├── public/
│   ├── team/                        # Csapattagok képei
│   └── uploads/                     # Feltöltött képek (esemény ID szerint)
├── scripts/
│   └── create-admin.ts              # Admin létrehozó script
└── README.md
```

## Adatbázis séma

A séma forrása a `prisma/schema.prisma`, az egyben importálható változat a `database/schema.sql`.

### User
- `id`, `email` (unique), `name`, `role` (admin/user)
- `emailVerified`, `resetToken`, `verificationToken`
- kapcsolat: `sessions`, `accounts`, `organizedEvents`

### Event
- `id`, `name`, `description?`, `date`
- kapcsolat: `images[]`, `organizers[]`

### Image
- `id`, `filename`, `path` (teljes kép), `thumbPath` (300×200), `mediumPath` (800px)
- kapcsolat: `event`

### EventOrganizer
- `eventId`, `userId` – eseményhez rendelt szerkesztők

### Session / Account / Verification
- Better Auth által kezelt táblák

## Fejlesztés

### Adatbázis séma módosítása

```bash
npx prisma migrate dev --name leiras
npm run db:generate
```

Éles környezetben:

```bash
npm run db:migrate
npm run db:generate
```

### Build éles környezethez

```bash
npm run build
npm start
```

### Frissítés GitHubról (éles szerver)

```bash
npm run deploy
```

Ez a parancs lehúzza a legújabb commitot a `main` ágról, telepíti a függőségeket, újrabuildeli az alkalmazást, majd újraindítja a PM2 processzt (`tatrai`).

## Biztonság

- Jelszavak bcrypt-tel hashelve
- Email-megerősítés regisztrációkor
- Session-alapú autentikáció (Better Auth)
- Middleware-védett admin útvonalak
- Szerepkör alapú hozzáférés (admin / user)
- Jelszó-visszaállítás biztonságos token alapján

## Licenc

MIT – szabadon használható és módosítható.

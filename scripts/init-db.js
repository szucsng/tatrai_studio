require('dotenv').config()
const mysql = require('mysql2/promise')
const { spawnSync } = require('child_process')

const REQUIRED_TABLES = [
  'User',
  'Session',
  'Account',
  'Verification',
  'Event',
  'Image',
  'EventOrganizer',
]

async function main() {
  const url = process.env.DATABASE_URL

  if (!url) {
    console.error('❌ DATABASE_URL nincs beállítva a .env fájlban.')
    process.exit(1)
  }

  console.log(`Adatbázis: ${describeDatabase(url)}`)

  const tables = await getTables(url)
  console.log(`Táblák: ${tables.length > 0 ? tables.join(', ') : '(üres)'}`)

  const hasMigrations = tables.includes('_prisma_migrations')
  const hasAppTables = tables.some((table) => REQUIRED_TABLES.includes(table))

  if (tables.length === 0) {
    console.log('Az adatbázis üres, migráció futtatása...')
    runPrisma(['migrate', 'deploy'])
    await verifyTables(url)
  } else if (hasMigrations) {
    console.log('Meglévő adatbázis, esetleges új migrációk futtatása...')
    runPrisma(['migrate', 'deploy'])
    await verifyTables(url)
  } else if (hasAppTables) {
    console.log('Az adatbázis már tartalmaz táblákat (pl. schema.sql import), migráció kihagyva.')
    await verifyTables(url)
  } else {
    console.error('❌ Az adatbázis nem üres, de nem ismert alkalmazás-séma.')
    console.error('Ellenőrizd, hogy a DATABASE_URL a megfelelő adatbázisra mutat-e.')
    process.exit(1)
  }

  // A Prisma Clientet minden induláskor a friss sémából generáljuk.
  console.log('Prisma Client generálása...')
  runPrisma(['generate'])
}

function describeDatabase(url) {
  try {
    const parsed = new URL(url)
    return `${parsed.pathname.replace(/^\//, '')} @ ${parsed.hostname}:${parsed.port || 3306}`
  } catch {
    return '(érvénytelen DATABASE_URL)'
  }
}

async function getTables(url) {
  const connection = await mysql.createConnection(url)

  try {
    const [rows] = await connection.query('SHOW TABLES')
    return rows.map((row) => Object.values(row)[0])
  } finally {
    await connection.end()
  }
}

async function verifyTables(url) {
  const tables = await getTables(url)
  const missing = REQUIRED_TABLES.filter((table) => !tables.includes(table))

  if (missing.length > 0) {
    console.error(`❌ Hiányzó táblák: ${missing.join(', ')}`)
    console.error('Ellenőrizd, hogy a DATABASE_URL ugyanarra az adatbázisra mutat-e, amit inicializáltál.')
    console.error('Ha a _prisma_migrations már tartalmazza a migrációt, de a táblák hiányoznak, ürítsd a DB-t, majd futtasd újra a db:init-et.')
    process.exit(1)
  }

  console.log('✅ Minden szükséges tábla megvan.')
}

function runPrisma(args) {
  const result = spawnSync('npx', ['prisma', ...args], {
    stdio: 'inherit',
    env: process.env,
  })

  if (result.error) {
    console.error(`❌ A prisma ${args.join(' ')} indítása sikertelen:`, result.error.message)
    process.exit(1)
  }

  if (result.status !== 0) {
    process.exit(result.status || 1)
  }
}

main().catch((error) => {
  console.error('❌ Adatbázis inicializálási hiba:', error.message)
  process.exit(1)
})

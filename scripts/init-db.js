require('dotenv').config()
const mysql = require('mysql2/promise')
const { spawnSync } = require('child_process')

async function main() {
  const url = process.env.DATABASE_URL

  if (!url) {
    console.error('❌ DATABASE_URL nincs beállítva a .env fájlban.')
    process.exit(1)
  }

  let connection

  try {
    connection = await mysql.createConnection(url)
  } catch (error) {
    console.error('❌ Nem sikerült kapcsolódni az adatbázishoz:', error.message)
    process.exit(1)
  }

  const [rows] = await connection.query('SHOW TABLES')
  await connection.end()

  const tables = rows.map((row) => Object.values(row)[0])
  const hasMigrations = tables.includes('_prisma_migrations')
  const hasAppTables = tables.some((table) =>
    ['User', 'Session', 'Account', 'Event', 'Image'].includes(table)
  )

  if (tables.length === 0) {
    console.log('Az adatbázis üres, migráció futtatása...')
    runPrisma(['migrate', 'deploy'])
  } else if (hasMigrations) {
    console.log('Meglévő adatbázis, esetleges új migrációk futtatása...')
    runPrisma(['migrate', 'deploy'])
  } else if (hasAppTables) {
    console.log('Az adatbázis már tartalmaz táblákat (pl. schema.sql import), migráció kihagyva.')
  } else {
    console.log('Az adatbázis nem üres, de nem ismert alkalmazás-séma. Migráció kihagyva.')
  }

  // A Prisma Clientet minden induláskor a friss sémából generáljuk.
  console.log('Prisma Client generálása...')
  runPrisma(['generate'])
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

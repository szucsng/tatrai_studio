require('dotenv').config()
const mysql = require('mysql2/promise')

const REQUIRED_TABLES = [
  'User',
  'Session',
  'Account',
  'Verification',
  'Event',
  'Image',
  'EventOrganizer',
]

async function testConnection() {
  const url = process.env.DATABASE_URL

  if (!url) {
    console.error('❌ DATABASE_URL nincs beállítva a .env fájlban.')
    process.exit(1)
  }

  try {
    const parsed = new URL(url)
    console.log(`Adatbázis: ${parsed.pathname.replace(/^\//, '')} @ ${parsed.hostname}:${parsed.port || 3306}`)
  } catch {
    console.error('❌ A DATABASE_URL formátuma érvénytelen.')
    process.exit(1)
  }

  try {
    const connection = await mysql.createConnection(url)
    console.log('✅ Kapcsolódás sikeres.')

    const [rows] = await connection.query('SHOW TABLES')
    const tables = rows.map((row) => Object.values(row)[0])

    console.log('Táblák:', tables.length > 0 ? tables.join(', ') : '(üres)')

    const missing = REQUIRED_TABLES.filter((table) => !tables.includes(table))
    if (missing.length > 0) {
      console.warn(`⚠️ Hiányzó táblák: ${missing.join(', ')}`)
      console.warn('Futtasd: npm run db:init')
    } else {
      console.log('✅ Minden szükséges tábla megvan.')
    }

    await connection.end()
  } catch (error) {
    console.error('❌ Kapcsolódás sikertelen:', error.message)
    process.exit(1)
  }
}

testConnection()

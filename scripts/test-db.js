require('dotenv').config()
const mysql = require('mysql2/promise')

async function testConnection() {
  const url = process.env.DATABASE_URL

  if (!url) {
    console.error('❌ DATABASE_URL nincs beállítva a .env fájlban.')
    process.exit(1)
  }

  try {
    const connection = await mysql.createConnection(url)
    console.log('✅ Kapcsolódás sikeres.')

    const [rows] = await connection.query('SHOW TABLES')
    console.log('Táblák:', rows)

    await connection.end()
  } catch (error) {
    console.error('❌ Kapcsolódás sikertelen:', error.message)
    process.exit(1)
  }
}

testConnection()

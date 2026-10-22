import 'dotenv/config'

const [email, name = 'Admin', password] = process.argv.slice(2)
const baseUrl = process.env.BETTER_AUTH_URL || 'http://localhost:5102'
const secret = process.env.ADMIN_SETUP_SECRET

if (!email || !password) {
  console.error('Használat: npm run create-admin -- email@example.com "Név" "jelszó"')
  process.exit(1)
}

if (!secret) {
  console.error('Az ADMIN_SETUP_SECRET nincs beállítva a .env fájlban.')
  process.exit(1)
}

async function main() {
  const response = await fetch(`${baseUrl}/api/setup/create-admin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name, password, secret }),
  })

  const data = await response.json()

  if (!response.ok) {
    console.error('Hiba az admin létrehozása során:', data)
    process.exit(1)
  }

  console.log('Admin felhasználó létrehozva:', email)
}

main().catch((error) => {
  console.error('Hiba:', error instanceof Error ? error.message : error)
  process.exit(1)
})

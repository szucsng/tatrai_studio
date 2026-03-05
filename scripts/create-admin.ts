import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2] || 'admin@example.com'
  const name = process.argv[3] || 'Admin'

  // Ellenőrizzük, hogy létezik-e már admin felhasználó
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    console.log(`A(z) "${email}" felhasználó már létezik!`)
    return
  }

  // Admin felhasználó létrehozása (better-auth használ külön account táblát a jelszóhoz)
  const user = await prisma.user.create({
    data: {
      email,
      name,
      emailVerified: false
    }
  })

  console.log(`Admin felhasználó sikeresen létrehozva!`)
  console.log(`Email: ${user.email}`)
  console.log(`Név: ${user.name}`)
  console.log(`\nFontos: A jelszót a better-auth setup API-val kell beállítani!`)
  console.log(`POST /api/setup/create-admin`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

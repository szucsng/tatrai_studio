import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Prisma Client inicializálás
export const prisma = globalForPrisma.prisma ?? (() => {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  } catch (error) {
    console.error('Prisma Client initialization error:', error)
    throw error
  }
})()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

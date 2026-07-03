import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env') })

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Prisma Client inicializálás
export const prisma = globalForPrisma.prisma ?? (() => {
  try {
    const client = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })

    // MySQL 1020 concurrency fix: Session update middleware
    client.$use(async (params, next) => {
      // Session update-nél updateMany-t használunk update helyett
      // Ez elkerüli a "Record has changed since last read" hibát
      if (params.model === 'Session' && params.action === 'update') {
        params.action = 'updateMany'
        params.args.where = { id: params.args.where.id }
      }
      
      return next(params)
    })

    return client
  } catch (error) {
    console.error('Prisma Client initialization error:', error)
    throw error
  }
})()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

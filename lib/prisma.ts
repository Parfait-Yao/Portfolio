import { neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

neonConfig.webSocketConstructor = ws

const createPrismaClient = () => {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set.')
  }

  // PrismaNeon v7 takes a PoolConfig object directly, not a Pool instance
  const adapter = new PrismaNeon({ connectionString })

  return new PrismaClient({
    adapter,
    log: ['error', 'warn'],
  })
}

const PRISMA_SYMBOL = Symbol.for('app.prisma.instance')
const globalAny = globalThis as any

if (!globalAny[PRISMA_SYMBOL]) {
  globalAny[PRISMA_SYMBOL] = createPrismaClient()
}

export const prisma = globalAny[PRISMA_SYMBOL] as PrismaClient

import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

// Requis pour les environnements Node.js serverless
neonConfig.webSocketConstructor = ws

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

const createPrismaClient = () => {
  // LECTURE AU MOMENT DE L'APPEL (Important pour Vercel)
  const url = process.env.DATABASE_URL
  
  if (!url) {
    console.warn("⚠️ DATABASE_URL non détectée, client standard utilisé.")
    return new PrismaClient()
  }

  const pool = new Pool({ connectionString: url })
  const adapter = new PrismaNeon(pool as any)

  return new PrismaClient({
    adapter,
    log: ['error', 'warn'],
  })
}

export const prisma = globalForPrisma.prisma || createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

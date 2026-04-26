import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

neonConfig.webSocketConstructor = ws

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

const createPrismaClient = () => {
  const url = process.env.DATABASE_URL
  
  // LOG DE DEBUG (S'affichera dans les logs Vercel)
  if (!url) {
    console.error("❌ CRITICAL: DATABASE_URL is NOT found in process.env at runtime!")
    return new PrismaClient()
  }

  try {
    const pool = new Pool({ connectionString: url })
    const adapter = new PrismaNeon(pool as any)

    return new PrismaClient({
      adapter,
      log: ['error', 'warn'],
    })
  } catch (e) {
    console.error("❌ Prisma Initialization Error:", e)
    return new PrismaClient()
  }
}

// En PRODUCTION sur Vercel, on évite de réutiliser un global potentiellement corrompu au build
export const prisma = (process.env.NODE_ENV === 'production') 
  ? createPrismaClient() 
  : (globalForPrisma.prisma || createPrismaClient())

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

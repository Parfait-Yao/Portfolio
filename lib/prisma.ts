import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

neonConfig.webSocketConstructor = ws

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

const createPrismaClient = () => {
  const url = process.env.DATABASE_URL
  
  if (!url) {
    console.warn("⚠️ DATABASE_URL non détectée à l'initialisation.")
    return new PrismaClient()
  }

  const pool = new Pool({ connectionString: url })
  const adapter = new PrismaNeon(pool as any)

  return new PrismaClient({
    adapter,
    log: ['error', 'warn'],
  })
}

// On utilise un Proxy pour que 'prisma' ne soit initialisé 
// QUE lorsqu'on essaie d'y accéder pour la première fois en production.
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop, receiver) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = createPrismaClient()
    }
    return Reflect.get(globalForPrisma.prisma, prop, receiver)
  }
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

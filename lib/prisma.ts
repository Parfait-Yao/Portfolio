import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

neonConfig.webSocketConstructor = ws

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

const createPrismaClient = () => {
  const url = process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL
  
  if (!url) {
    console.error("❌ ERROR: DATABASE_URL is missing! Keys available:", Object.keys(process.env).filter(k => !k.includes('KEY') && !k.includes('SECRET')))
    return new PrismaClient()
  }

  console.log("✅ DATABASE_URL détectée (longueur: " + url.length + ")")

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

export const prisma = (process.env.NODE_ENV === 'production') 
  ? createPrismaClient() 
  : (globalForPrisma.prisma || createPrismaClient())

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Essential for Neon serverless in certain environments
neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeon({ connectionString });

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: adapter as any, // Cast as any to resolve type mismatch in some dev environments
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

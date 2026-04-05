import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter: adapter as any });

async function main() {
  const experiences = await prisma.experience.findMany();
  console.log('Experiences in DB:', experiences.length);
  const education = await prisma.education.findMany();
  console.log('Education in DB:', education.length);
}

main().finally(() => prisma.$disconnect());

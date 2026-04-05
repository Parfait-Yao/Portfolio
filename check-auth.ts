import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import bcrypt from "bcryptjs";

neonConfig.webSocketConstructor = ws;

const connectionString = "postgresql://neondb_owner:npg_dkTXRQ2u9FPL@ep-young-dust-anz8uufq-pooler.c-6.us-east-1.aws.neon.tech/neondb";
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter: adapter as any });

async function main() {
  const email = 'parfaitericyao123@gmail.com';
  const password = 'Eric2003***';

  console.log(`🔍 Checking for admin: ${email}`);
  
  const admin = await prisma.admin.findUnique({
    where: { email }
  });

  if (!admin) {
    console.log('❌ Admin NOT found in database.');
    const allAdmins = await prisma.admin.findMany();
    console.log('Current admins in DB:', allAdmins.map(a => a.email));
    return;
  }

  console.log('✅ Admin found in database.');
  
  const isValid = await bcrypt.compare(password, admin.password);
  console.log(`🔐 Password check: ${isValid ? 'SUCCEEDED' : 'FAILED'}`);
  
  if (!isValid) {
    console.log('Hash in DB:', admin.password);
    const newHash = await bcrypt.hash(password, 12);
    console.log('New hash generated:', newHash);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const admins = await prisma.admin.findMany()
  console.log('Admins found:', admins.map(a => ({ id: a.id, email: a.email })))
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

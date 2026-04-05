import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'parfaitericyao123@gmail.com'
  const password = 'Eric2003***'
  
  console.log(`🔐 Resetting admin: ${email}...`)
  
  const hashedPassword = await bcrypt.hash(password, 12)
  
  const admin = await prisma.admin.upsert({
    where: { email },
    update: {
      password: hashedPassword
    },
    create: {
      email,
      password: hashedPassword
    },
  })
  
  console.log('✅ Admin reset successful!')
  console.log(`- Email: ${email}`)
  console.log(`- Password: ${password}`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

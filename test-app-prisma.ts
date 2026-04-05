import 'dotenv/config'
import { prisma } from './lib/prisma'

async function test() {
  console.log('Testing app prisma instance...')
  try {
    await prisma.$connect()
    const res = await prisma.project.count()
    console.log('App Prisma connected! Project count:', res)
  } catch (err) {
    console.error('App Prisma failed!', err)
  } finally {
    await prisma.$disconnect()
  }
}

test()

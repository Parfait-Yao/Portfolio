import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from "@prisma/adapter-neon"
import { neonConfig } from "@neondatabase/serverless"
import ws from "ws"
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

neonConfig.webSocketConstructor = ws

const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaNeon({ connectionString })
const prisma = new PrismaClient({ adapter: adapter as any })

async function main() {
  console.log('🚀 Seeding professional portfolio data...')

  // 1. Admin
  const hashedPassword = await bcrypt.hash('Eric2003***', 12)
  await prisma.admin.upsert({
    where: { email: 'parfaitericyao123@gmail.com' },
    update: {},
    create: {
      email: 'parfaitericyao123@gmail.com',
      password: hashedPassword,
    },
  })
  console.log('✅ Admin created')

  // 2. About
  await prisma.about.deleteMany()
  await prisma.about.create({
    data: {
      bio: "Développeur fullstack passionné basé en Côte d'Ivoire. Je crée des applications web modernes avec Next.js, React et Node.js. Toujours à la recherche de nouveaux défis techniques.",
      location: "Abidjan, Côte d'Ivoire",
      email: "parfaitericyao123@gmail.com",
      github: "https://github.com/parfaiteric",
      linkedin: "https://linkedin.com/in/parfaiteric",
      twitter: "https://twitter.com/parfaiteric",
    }
  })
  console.log('✅ About section created')

  // 3. Projects
  await prisma.project.deleteMany()
  await prisma.project.createMany({
    data: [
      {
        title: "E-Commerce Platform",
        description: "Plateforme e-commerce complète avec Next.js et Stripe",
        longDesc: "Une solution e-commerce robuste incluant la gestion des paniers, l'intégration des paiements Stripe, et un tableau de bord administrateur pour la gestion des stocks.",
        tags: ["Next.js", "TypeScript", "Prisma", "Stripe"],
        githubUrl: "https://github.com/parfaiteric/ecommerce",
        liveUrl: "https://ecommerce-demo.vercel.app",
        featured: true,
        order: 1
      },
      {
        title: "Dashboard Analytics",
        description: "Dashboard temps réel avec charts et WebSockets",
        longDesc: "Visualisation de données complexes en temps réel utilisant Socket.io et Chart.js. Inclus des rapports dynamiques et des notifications instantanées.",
        tags: ["React", "Node.js", "Socket.io", "Chart.js"],
        githubUrl: "https://github.com/parfaiteric/analytics",
        featured: true,
        order: 2
      },
      {
        title: "SaaS Landing Page",
        description: "Landing page moderne style Scribbit",
        longDesc: "Design ultra-propre avec animations Framer Motion haute performance et une hiérarchie visuelle impeccable.",
        tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
        githubUrl: "https://github.com/parfaiteric/saas-landing",
        featured: false,
        order: 3
      }
    ]
  })
  console.log('✅ Projects seeded')

  // 4. Skills
  await prisma.skill.deleteMany()
  await prisma.skill.createMany({
    data: [
      { name: "Next.js", level: 92, category: "Frontend", order: 1 },
      { name: "React", level: 95, category: "Frontend", order: 2 },
      { name: "TypeScript", level: 88, category: "Frontend", order: 3 },
      { name: "Tailwind CSS", level: 98, category: "Frontend", order: 4 },
      { name: "Node.js", level: 85, category: "Backend", order: 1 },
      { name: "Prisma", level: 84, category: "Backend", order: 2 },
      { name: "PostgreSQL", level: 80, category: "Backend", order: 3 },
      { name: "Docker", level: 70, category: "DevOps", order: 1 },
      { name: "Git / GitHub", level: 90, category: "DevOps", order: 2 }
    ]
  })
  console.log('✅ Skills seeded')

  // 5. Experience
  await prisma.experience.deleteMany()
  await prisma.experience.createMany({
    data: [
      {
        company: "Tech Agency X",
        role: "Développeur Fullstack Lead",
        startDate: new Date('2023-01-01'),
        current: true,
        description: "Direction technique sur des projets complexes utilisant Next.js et architecture microservices.",
        location: "Remote / Abidjan",
        order: 1
      },
      {
        company: "Startup Innovate",
        role: "Développeur Frontend",
        startDate: new Date('2021-06-01'),
        endDate: new Date('2022-12-31'),
        current: false,
        description: "Développement d'interfaces utilisateur performantes et intégration d'APIs REST.",
        location: "Abidjan",
        order: 2
      }
    ]
  })
  console.log('✅ Experiences seeded')

  console.log('🏁 Seeding finished successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


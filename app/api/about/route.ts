import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Pilote HTTP direct pour Neon (plus stable au build)
const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null

export async function GET() {
  if (!sql) return NextResponse.json({ error: "Database not configured" }, { status: 500 })
  
  try {
    // Utilisation du pilote HTTP direct pour éviter les soucis de Prisma au build
    const results = await sql`SELECT * FROM "About" LIMIT 1`
    return NextResponse.json(results[0] || {})
  } catch (error) {
    console.error("[ABOUT_GET]", error)
    // Fallback silencieux vers un objet vide pour ne pas faire planter le build
    return NextResponse.json({})
  }
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session) return new NextResponse('Unauthorized', { status: 401 })

  try {
    const data = await req.json()
    const { id, ...fields } = data

    let res
    if (id) {
      res = await prisma.about.update({
        where: { id },
        data: fields
      })
    } else {
      const existing = await prisma.about.findFirst()
      if (existing) {
        res = await prisma.about.update({
          where: { id: existing.id },
          data: fields
        })
      } else {
        res = await prisma.about.create({
          data: fields
        })
      }
    }
    
    revalidatePath('/')
    revalidatePath('/about')
    revalidatePath('/admin/about')
    
    return NextResponse.json(res)
  } catch (error) {
    console.error("[ABOUT_PUT]", error)
    return NextResponse.json({ error: "Failed to update about" }, { status: 500 })
  }
}

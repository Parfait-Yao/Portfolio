import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const { neon } = await import("@neondatabase/serverless")
    const DATABASE_URL = process.env.DATABASE_URL
    
    if (!DATABASE_URL) return NextResponse.json({})
    
    const sql = neon(DATABASE_URL)
    const results = await sql`SELECT * FROM "About" LIMIT 1`
    return NextResponse.json(results[0] || {})
  } catch (error) {
    return NextResponse.json({})
  }
}

export async function PUT(req: Request) {
  try {
    const { auth } = await import("@/lib/auth")
    const session = await auth()
    if (!session) return new NextResponse('Unauthorized', { status: 401 })

    const { prisma } = await import("@/lib/prisma")
    const { revalidatePath } = await import("next/cache")
    
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

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    // On s'assure que prisma est bien accessible
    if (!prisma) {
        return NextResponse.json({ error: "Database client not initialized" }, { status: 500 })
    }
    const about = await prisma.about.findFirst()
    return NextResponse.json(about || {})
  } catch (error) {
    console.error("[ABOUT_GET]", error)
    return NextResponse.json({ error: "Failed to fetch about" }, { status: 500 })
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

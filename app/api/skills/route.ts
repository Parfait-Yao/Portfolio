import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma")
    const skills = await prisma.skill.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(skills)
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  try {
    const { auth } = await import("@/lib/auth")
    const session = await auth()
    if (!session) return new NextResponse('Unauthorized', { status: 401 })

    const { prisma } = await import("@/lib/prisma")
    const data = await req.json()
    const skill = await prisma.skill.create({
      data: {
        name: data.name,
        level: data.level,
        category: data.category,
        icon: data.icon,
        order: data.order
      }
    })
    return NextResponse.json(skill)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}

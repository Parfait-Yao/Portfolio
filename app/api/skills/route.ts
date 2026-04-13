import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(skills)
  } catch (error) {
    console.error("[SKILLS_GET]", error)
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return new NextResponse('Unauthorized', { status: 401 })

  try {
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
    console.error("[SKILLS_POST]", error)
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}

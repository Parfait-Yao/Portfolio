import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { startDate: 'desc' }
    })
    return NextResponse.json(experiences)
  } catch (error) {
    console.error("[EXPERIENCE_GET]", error)
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return new NextResponse('Unauthorized', { status: 401 })

  try {
    const data = await req.json()
    const experience = await prisma.experience.create({
      data: {
        company: data.company,
        role: data.role,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        current: data.current,
        description: data.description,
        location: data.location,
        order: data.order
      }
    })
    return NextResponse.json(experience)
  } catch (error) {
    console.error("[EXPERIENCE_POST]", error)
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 })
  }
}

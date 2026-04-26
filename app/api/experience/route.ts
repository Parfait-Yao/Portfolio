import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma")
    const experiences = await prisma.experience.findMany({
      orderBy: { startDate: 'desc' }
    })
    return NextResponse.json(experiences)
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
    const experience = await prisma.experience.create({
      data: {
        company: data.company,
        role: data.role,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        current: data.current,
        description: data.description,
        location: data.location,
        order: data.order,
        imageUrl: data.imageUrl,
        likes: data.likes || 0,
      } as any
    })
    return NextResponse.json(experience)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 })
  }
}

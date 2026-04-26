import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma")
    const education = await prisma.education.findMany({
      orderBy: { startDate: 'desc' }
    })
    return NextResponse.json(education)
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
    const education = await prisma.education.create({
      data: {
        school: data.school,
        degree: data.degree,
        field: data.field,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        description: data.description,
        order: data.order
      }
    })
    return NextResponse.json(education)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create education" }, { status: 500 })
  }
}

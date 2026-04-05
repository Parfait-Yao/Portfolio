import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { startDate: 'desc' }
    })
    return NextResponse.json(education)
  } catch (error) {
    console.error("[EDUCATION_GET]", error)
    return NextResponse.json({ error: "Failed to fetch education" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return new NextResponse('Unauthorized', { status: 401 })

  try {
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
    console.error("[EDUCATION_POST]", error)
    return NextResponse.json({ error: "Failed to create education" }, { status: 500 })
  }
}

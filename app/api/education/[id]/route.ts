import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return new NextResponse('Unauthorized', { status: 401 })

  try {
    const { id } = await params;
    const data = await req.json()
    const education = await prisma.education.update({
      where: { id },
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
    console.error("[EDUCATION_PUT]", error)
    return NextResponse.json({ error: "Failed to update education" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return new NextResponse('Unauthorized', { status: 401 })

  try {
    const { id } = await params;
    await prisma.education.delete({
      where: { id }
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[EDUCATION_DELETE]", error)
    return NextResponse.json({ error: "Failed to delete education" }, { status: 500 })
  }
}

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
    const experience = await prisma.experience.update({
      where: { id },
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
      }
    })
    return NextResponse.json(experience)
  } catch (error) {
    console.error("[EXPERIENCE_PUT]", error)
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 })
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
    await prisma.experience.delete({
      where: { id }
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[EXPERIENCE_DELETE]", error)
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 })
  }
}

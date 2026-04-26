import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return new NextResponse('Unauthorized', { status: 401 })

  try {
    const { id } = await params;
    const data = await req.json()
    const skill = await prisma.skill.update({
      where: { id },
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
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return new NextResponse('Unauthorized', { status: 401 })

  try {
    const { id } = await params;
    await prisma.skill.delete({
      where: { id }
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 })
  }
}

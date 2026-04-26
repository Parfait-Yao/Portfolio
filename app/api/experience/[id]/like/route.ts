import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { prisma } = await import("@/lib/prisma")
    const { id } = await params
    const experience = await (prisma.experience as any).update({
      where: { id },
      data: {
        likes: { increment: 1 }
      }
    })
    return NextResponse.json(experience)
  } catch (error) {
    return NextResponse.json({ error: "Failed to like experience" }, { status: 500 })
  }
}

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const experience = await prisma.experience.update({
      where: { id },
      data: {
        likes: { increment: 1 }
      }
    })
    return NextResponse.json(experience)
  } catch (error) {
    console.error("[EXPERIENCE_LIKE_PATCH]", error)
    return NextResponse.json({ error: "Failed to like experience" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma")
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(projects)
  } catch (error) {
    console.error("GET Projects Error:", error)
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
    
    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        longDesc: data.longDesc || null,
        imageUrl: data.imageUrl || null,
        tags: data.tags || [],
        githubUrl: data.githubUrl || null,
        liveUrl: data.liveUrl || null,
        featured: data.featured || false,
        order: data.order || 0,
      }
    })
    
    return NextResponse.json(project)
  } catch (error: any) {
    console.error("POST Project Error:", error.message || error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { prisma } = await import('@/lib/prisma')
    const { id } = await params;
    
    const project = await prisma.project.findUnique({
      where: { id }
    })

    if (!project) {
      return new NextResponse('Project not found', { status: 404 })
    }

    const updatedProject = await (prisma.project as any).update({
      where: { id },
      data: {
        likes: {
          increment: 1
        }
      }
    })

    return NextResponse.json(updatedProject)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}

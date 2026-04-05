import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const project = await prisma.project.findUnique({
      where: { id }
    })

    if (!project) {
      return new NextResponse('Project not found', { status: 404 })
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        likes: {
          increment: 1
        }
      }
    })

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error('[PROJECT_LIKE]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

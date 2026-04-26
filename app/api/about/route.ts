import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const about = await prisma.about.findFirst()
    return NextResponse.json(about || {})
  } catch (error) {
    console.error("[ABOUT_GET]", error)
    return NextResponse.json({ error: "Failed to fetch about" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session) return new NextResponse('Unauthorized', { status: 401 })

  try {
    const data = await req.json()
    const { id, ...fields } = data

    // Convert empty strings to null or leave them alone depending on schema. 
    // Prisma accepts empty strings for Strings, but let's make sure it's clean.

    let res
    if (id) {
      res = await prisma.about.update({
        where: { id },
        data: fields
      })
    } else {
      // Create is needed if no About record exists yet
      // Sometimes findFirst might exist and people delete it, but generally we just create
      
      // Since there's supposed to be only one about record max, let's ensure we don't create duplicates
      const existing = await prisma.about.findFirst()
      if (existing) {
        res = await prisma.about.update({
          where: { id: existing.id },
          data: fields
        })
      } else {
        res = await prisma.about.create({
          data: fields
        })
      }
    }
    
    // Revalidate paths that show about data
    revalidatePath('/')
    revalidatePath('/about')
    revalidatePath('/admin/about')
    
    return NextResponse.json(res)
  } catch (error) {
    console.error("[ABOUT_PUT]", error)
    return NextResponse.json({ error: "Failed to update about" }, { status: 500 })
  }
}

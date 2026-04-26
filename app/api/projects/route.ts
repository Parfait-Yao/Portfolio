import { auth } from "@/lib/auth"
import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null

export async function GET() {
  if (!sql) return NextResponse.json({ error: "Database not configured" }, { status: 500 })
  try {
    // Note: We use the serverless HTTP driver for better compatibility with Next.js 16/Node 24
    const projects = await sql`SELECT * FROM "Project" ORDER BY "order" ASC`
    return NextResponse.json(projects)
  } catch (error) {
    console.error("[PROJECTS_GET]", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  if (!sql) return NextResponse.json({ error: "Database not configured" }, { status: 500 })
  const session = await auth()
  if (!session) return new NextResponse('Unauthorized', { status: 401 })

  try {
    const data = await req.json()
    // For writes, we can still try to use Prisma if needed, but for now we'll stick to a simple POST for the admin 
    // Usually admin uses Prisma, but public can use Neon HTTP
    const res = await sql`
      INSERT INTO "Project" (title, description, "imageUrl", tags, "githubUrl", "liveUrl", "featured", "order")
      VALUES (${data.title}, ${data.description}, ${data.imageUrl}, ${data.tags}, ${data.githubUrl}, ${data.liveUrl}, ${data.featured}, ${data.order})
      RETURNING *
    `
    return NextResponse.json(res[0])
  } catch (error) {
    console.error("[PROJECTS_POST]", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

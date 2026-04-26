import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const { neon } = await import("@neondatabase/serverless")
    const DATABASE_URL = process.env.DATABASE_URL
    if (!DATABASE_URL) return NextResponse.json([])
    
    const sql = neon(DATABASE_URL)
    const projects = await sql`SELECT * FROM "Project" ORDER BY "order" ASC`
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  try {
    const { auth } = await import("@/lib/auth")
    const session = await auth()
    if (!session) return new NextResponse('Unauthorized', { status: 401 })

    const { neon } = await import("@neondatabase/serverless")
    const DATABASE_URL = process.env.DATABASE_URL
    if (!DATABASE_URL) return NextResponse.json({ error: "DB not configured" }, { status: 500 })
    
    const sql = neon(DATABASE_URL)
    const data = await req.json()
    const res = await sql`
      INSERT INTO "Project" (title, description, "imageUrl", tags, "githubUrl", "liveUrl", "featured", "order")
      VALUES (${data.title}, ${data.description}, ${data.imageUrl}, ${data.tags}, ${data.githubUrl}, ${data.liveUrl}, ${data.featured}, ${data.order})
      RETURNING *
    `
    return NextResponse.json(res[0])
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

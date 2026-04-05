import { auth } from "@/lib/auth"
import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const skills = await sql`SELECT * FROM "Skill" ORDER BY "order" ASC`
    return NextResponse.json(skills)
  } catch (error) {
    console.error("[SKILLS_GET]", error)
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return new NextResponse('Unauthorized', { status: 401 })

  try {
    const data = await req.json()
    const res = await sql`
      INSERT INTO "Skill" (name, level, category, icon, "order")
      VALUES (${data.name}, ${data.level}, ${data.category}, ${data.icon}, ${data.order})
      RETURNING *
    `
    return NextResponse.json(res[0])
  } catch (error) {
    console.error("[SKILLS_POST]", error)
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}

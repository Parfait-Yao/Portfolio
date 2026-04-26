import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  if (!session) return new NextResponse('Unauthorized', { status: 401 })

  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, subject, body: messageBody } = body

    if (!name || !email || !subject || !messageBody) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const message = await prisma.message.create({
      data: {
        name,
        email,
        subject,
        body: messageBody
      }
    })

    // TODO: Send email using Resend
    
    return NextResponse.json(message)
  } catch (error) {
    console.error("Error creating message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

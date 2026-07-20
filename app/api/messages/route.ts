import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const { auth } = await import("@/lib/auth")
    const session = await auth()
    if (!session) return new NextResponse('Unauthorized', { status: 401 })

    const { prisma } = await import("@/lib/prisma")
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  try {
    const { prisma } = await import("@/lib/prisma")
    const body = await req.json()
    const { name, email, subject, body: messageBody } = body

    if (!name || !email || !messageBody) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Use a default subject if none is provided
    const finalSubject = subject || "Contact via Portfolio"

    // Save to database
    const message = await prisma.message.create({
      data: {
        name,
        email,
        subject: finalSubject,
        body: messageBody
      }
    })

    // Send email notification via Resend (non-blocking — don't fail the request if email fails)
    try {
      const { sendContactEmail } = await import("@/lib/email")
      const emailResult = await sendContactEmail({
        name,
        email,
        subject: finalSubject,
        body: messageBody,
      })
      if (emailResult?.error) {
        console.error("Resend email error:", emailResult.error)
      }
    } catch (emailError) {
      console.error("Failed to send contact email notification:", emailError)
      // Don't fail the API response — the message is already saved in DB
    }

    return NextResponse.json(message)
  } catch (error) {
    console.error("Error creating message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

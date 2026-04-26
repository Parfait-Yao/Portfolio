import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { auth } = await import("@/lib/auth")
    const session = await auth()
    if (!session) return new NextResponse('Unauthorized', { status: 401 })

    const { uploadImage } = await import("@/lib/cloudinary")
    const body = await req.json()
    const { image } = body

    if (!image) {
      return NextResponse.json({ error: "Missing image data" }, { status: 400 })
    }

    const result = await uploadImage(image)
    
    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}

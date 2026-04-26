import { auth } from "@/lib/auth"
import { uploadImage } from "@/lib/cloudinary"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return new NextResponse('Unauthorized', { status: 401 })

  try {
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

import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma")
    
    // Vérifier si l'admin existe déjà
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: 'parfaitericyao123@gmail.com' }
    })

    if (existingAdmin) {
      return NextResponse.json({ message: "L'admin existe déjà !" })
    }

    // Créer l'admin
    const hashedPassword = await bcrypt.hash('Eric2003***', 12)
    await prisma.admin.create({
      data: {
        email: 'parfaitericyao123@gmail.com',
        password: hashedPassword,
      }
    })

    return NextResponse.json({ message: "Compte Admin créé avec succès ! Vous pouvez vous connecter." })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

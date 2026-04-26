import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma")
    
    console.log("🚀 Tentative de réinitialisation de l'admin...")

    const email = 'parfaitericyao123@gmail.com'
    const password = 'Eric2003***'

    // On supprime l'ancien s'il existe pour être sûr de repartir à zéro
    try {
      await prisma.admin.deleteMany({
        where: { email }
      })
    } catch (e) {
      console.log("Note: Pas d'admin à supprimer.")
    }

    // On crée le nouveau
    const hashedPassword = await bcrypt.hash(password, 12)
    const newAdmin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: "Compte Admin RÉINITIALISÉ avec succès !",
      email: newAdmin.email 
    })

  } catch (error: any) {
    console.error("❌ Erreur dans seed-admin:", error.message)
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      tip: "Vérifiez que votre DATABASE_URL est correcte sur Vercel."
    }, { status: 500 })
  }
}

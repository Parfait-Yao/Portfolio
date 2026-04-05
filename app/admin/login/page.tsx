"use client"
import React, { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Accès refusé. Veuillez vérifier vos identifiants.")
      } else {
        toast.success("Authentification réussie. Synchronisation...")
        router.push("/admin/dashboard")
        router.refresh()
      }
    } catch (error) {
      toast.error("Échec de la connexion réseau.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F5] px-6 select-none">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] font-display text-[30vw] text-[#0A0A0A]/[0.02] leading-none">
          Archive
        </div>
        <div className="absolute bottom-[-10%] left-[-10%] font-display text-[30vw] text-[#0A0A0A]/[0.02] leading-none">
          Portal
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
            <ShieldCheck size={14} /> Accès Sécurisé
          </div>
          <h1 className="font-display text-[clamp(40px,5vw,56px)] leading-none text-[#0A0A0A] mb-4">
             Admin <span className="text-[#888888]">Login.</span>
          </h1>
          <p className="font-body text-[15px] text-[#6B6B6B] tracking-tight">
            Connectez-vous à votre écosystème de gestion.
          </p>
        </div>

        <div className="bg-white border border-[#E8E8E4] rounded-3xl p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)]">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-body text-[11px] font-bold text-[#3D3D3A] uppercase tracking-widest ml-1">Identifiant Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0B0B0] group-focus-within:text-[#0A0A0A] transition-colors" size={18} />
                  <input 
                    type="email" 
                    required 
                    placeholder="admin@scribbit.io" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 bg-[#F7F7F5] border border-[#E8E8E4] rounded-xl pl-12 pr-5 font-body text-[15px] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-body text-[11px] font-bold text-[#3D3D3A] uppercase tracking-widest ml-1">Clé de Sécurité</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0B0B0] group-focus-within:text-[#0A0A0A] transition-colors" size={18} />
                  <input 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 bg-[#F7F7F5] border border-[#E8E8E4] rounded-xl pl-12 pr-5 font-body text-[15px] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#0A0A0A] text-white h-16 rounded-2xl font-body font-bold text-[14px] uppercase tracking-[0.2em] hover:bg-[#333] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>Connecter l'Archive <ArrowRight size={20} /></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-[#F2F2EF] text-center">
             <p className="font-body text-[12px] text-[#B0B0B0] uppercase tracking-widest leading-loose">
               Propulsé par Scribbit v1.0 <br />
               © {new Date().getFullYear()} Tous Droits Réservés.
             </p>
          </div>
        </div>
      </div>
    </div>
  )
}


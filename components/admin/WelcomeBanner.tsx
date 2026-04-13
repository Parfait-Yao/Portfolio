import React from "react"
import { ArrowRight, Sparkles } from "lucide-react"

export default function WelcomeBanner({ name }: { name: string }) {
  return (
    <div className="relative overflow-hidden bg-primary rounded-2xl p-10 md:p-12 text-primary-foreground mb-12 flex flex-col md:flex-row items-center justify-between border border-border">
      {/* Subtle Background Text */}
      <div className="absolute top-0 right-0 font-display text-[120px] text-primary-foreground/[0.03] leading-none select-none pointer-events-none translate-x-1/4 -translate-y-1/4">
        Admin
      </div>

      <div className="relative z-10 flex-1 max-w-xl">
        <div className="flex items-center gap-2 font-body text-[11px] font-bold text-muted-foreground uppercase tracking-[0.3em] mb-6">
          <Sparkles size={12} className="text-primary-foreground" /> Connecté en tant qu'administrateur
        </div>
        <h2 className="font-display text-[clamp(32px,5vw,48px)] leading-tight mb-6">
          Bonjour, <span className="text-muted-foreground">{name}.</span> 👋
        </h2>
        <p className="font-body text-[16px] text-muted-foreground leading-relaxed mb-8 max-w-md">
          Votre écosystème numérique est sous contrôle. Consultez vos dernières archives, messages et statistiques de performance.
        </p>
        <button className="bg-card text-foreground px-10 py-4 rounded-full font-body font-bold text-[13px] uppercase tracking-widest hover:bg-muted transition-all flex items-center gap-3">
          Explorer les données <ArrowRight size={18} />
        </button>
      </div>

      <div className="relative z-10 mt-12 md:mt-0 md:ml-12 w-full md:w-auto flex justify-center">
        {/* Minimalist Architectural Illustration */}
        <div className="relative w-48 h-48 border border-white/[0.1] rounded-full flex items-center justify-center">
          <div className="absolute inset-4 border border-white/[0.05] rounded-full animate-[spin_20s_linear_infinite]"></div>
          <div className="w-24 h-24 bg-card/[0.05] backdrop-blur-sm rounded-2xl rotate-12 flex items-center justify-center border border-white/[0.1]">
            <div className="w-12 h-1 bg-card/20 rounded-full mb-3"></div>
            <div className="w-8 h-1 bg-card/10 rounded-full"></div>
          </div>
          {/* Dashboard lines */}
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="absolute opacity-40">
            <path d="M20 100 L40 60 L60 80 L80 40 L100 70" stroke="white" strokeWidth="1" strokeLinecap="round" strokeDasharray="4 4" />
          </svg>
        </div>
      </div>
    </div>
  )
}

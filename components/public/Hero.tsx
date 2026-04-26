"use client"
import React from "react"
import { motion } from "framer-motion"
import { ChevronRight, Mail } from "lucide-react"
import Link from "next/link"
import Magnetic from "./Magnetic"
import { useLanguage } from '@/context/LanguageContext'

interface HeroProps {
  photo?: string | null
}

export default function Hero({ photo }: HeroProps) {
  const { t } = useLanguage()

  return (
    <section className="relative pt-[120px] pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        
        {/* Photo de profil arrondie avec Badge */}
        <div className="mb-12 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative inline-block"
          >
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-[4px] border-background shadow-2xl relative z-10 mx-auto transition-colors duration-300 bg-muted">
              <img 
                src={photo || "/profile_placeholder.png"} 
                alt="Profile" 
                className="w-full h-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
              />
            </div>
            
            {/* Badge flottant */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -right-8 -bottom-2 z-20"
            >
              <div className="bg-background/80 backdrop-blur-md border border-border shadow-2xl rounded-full py-1.5 px-3 flex items-center gap-2 whitespace-nowrap scale-90 md:scale-100">
                <span className="text-[11px] font-bold text-foreground tracking-tight">Parfait Eric</span>
                <span className="text-[12px]">🤘</span>
              </div>
            </motion.div>

            {/* Anneau décoratif */}
            <div className="absolute inset-0 -m-2 rounded-full border border-foreground/5 animate-pulse" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-foreground/5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-10 text-foreground/60"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          {t.home.heroTag}
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-[clamp(44px,10vw,88px)] font-serif leading-[0.95] tracking-tight mb-12 text-foreground"
        >
          {t.home.heroTitle1} <br />
          {t.home.heroTitle2} <span className="text-foreground/40 italic">{t.home.heroTitle3}</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="font-body text-[18px] md:text-[22px] text-foreground/60 leading-relaxed max-w-2xl mx-auto mb-16 text-balance"
        >
          {t.home.heroDesc1}. {t.home.heroDesc2}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <Magnetic>
            <Link href="/projects" className="bg-primary text-primary-foreground px-10 py-5 rounded-full font-bold text-[14px] uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-3 shadow-2xl">
              {t.home.myProjects} <ChevronRight size={18} />
            </Link>
          </Magnetic>
          
          <Magnetic>
            <Link href="/contact" className="px-10 py-5 rounded-full border border-border font-bold text-[14px] uppercase tracking-widest hover:bg-foreground hover:text-background transition-all flex items-center gap-3">
              <Mail size={18} /> {t.home.contact}
            </Link>
          </Magnetic>
        </motion.div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none opacity-20">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>
    </section>
  )
}

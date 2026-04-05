"use client"
import React from "react"
import { motion } from "framer-motion"
import { Cpu, ChevronRight, Mail } from "lucide-react"
import Link from "next/link"
import Magnetic from "./Magnetic"

interface HeroProps {
  about: any
  photoFallback: string
}

export default function Hero({ about, photoFallback }: HeroProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 relative">
      
      {/* Profile Photo Redesign */}
      <div className="mb-12 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative inline-block"
        >
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-[4px] border-background shadow-xl relative z-10 mx-auto transition-colors duration-300">
            <img 
              src={about?.photo || "/profile_placeholder.png"} 
              alt="Profile" 
              className="w-full h-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
            />

          </div>
          
          {/* Floating Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -10, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute -right-12 bottom-4 z-20"
          >
            <div className="bg-card border border-border shadow-lg rounded-full py-2 px-4 flex items-center gap-2 whitespace-nowrap">
              <span className="text-[12px] font-bold text-foreground">Parfait Eric</span>
              <span className="text-[12px]">🤘</span>
            </div>
          </motion.div>

          {/* Subtle Decorative Ring */}
          <div className="absolute inset-0 -m-2 rounded-full border border-foreground/5 animate-pulse" />
        </motion.div>
      </div>

      <div className="flex justify-center mb-8">
        <span className="pill-tag inline-flex items-center gap-2">
          <Cpu size={14} className="text-foreground/40" /> Développeur Fullstack
        </span>
      </div>

      <h1 className="mb-10 text-[clamp(44px,10vw,80px)] leading-[1.05] tracking-tight text-foreground font-serif">
        Concevoir l'excellence <br /> numérique <span className="text-foreground/40 italic">par le code.</span>
      </h1>
      
      <p className="font-body text-[18px] md:text-[22px] text-foreground/70 leading-relaxed max-w-2xl mx-auto mb-14 text-balance">
        {about?.bio.split('.')[0]}. Je transforme des visions complexes en solutions logicielles élégantes et performantes.
      </p>
      
      <div className="flex flex-wrap justify-center gap-6">
        <Magnetic>
          <Link href="/projects" className="btn-primary group">
            Mes projets <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </Magnetic>
        <Magnetic>
          <Link href="/contact" className="btn-secondary flex items-center gap-2 group">
            <Mail size={18} className="text-foreground/50 group-hover:text-foreground transition-colors" /> Contact
          </Link>
        </Magnetic>
      </div>
    </div>
  )
}

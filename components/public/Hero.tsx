"use client"
import React from "react"
import { motion } from "framer-motion"
import { ChevronRight, Mail, ArrowDown, Sparkles } from "lucide-react"
import Link from "next/link"
import Magnetic from "./Magnetic"
import { useLanguage } from '@/context/LanguageContext'

interface HeroProps {
  photo?: string | null
}

function Ring({ size, delay, opacity, dashed }: { size: number; delay: number; opacity: number; dashed?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity, scale: 1 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: size, height: size }}
      className={`absolute rounded-full border border-primary/[0.12] ${dashed ? 'border-dashed' : ''} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
    />
  )
}

function StatBadge({ value, label, icon, className }: { value: string; label: string; icon: string; className: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.4, type: "spring" }}
      className={`absolute ${className}`}
    >
      <div className="relative bg-card/90 backdrop-blur-xl border border-border rounded-2xl px-4 py-3 flex items-center gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-300">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base bg-primary/10">
          {icon}
        </div>
        <div>
          <p className="text-[13px] font-bold text-foreground leading-none">{value}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">{label}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero({ photo }: HeroProps) {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden aurora-bg">
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-30%] left-[-15%] w-[80%] h-[80%] bg-primary/[0.06] dark:bg-primary/[0.1] rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/[0.05] dark:bg-secondary/[0.08] rounded-full blur-[120px]" />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-primary/[0.03] dark:bg-primary/[0.06] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 flex flex-col items-center text-center">

        {/* Photo with rings */}
        <div className="relative mb-14 flex items-center justify-center">
          <Ring size={220} delay={0.2} opacity={0.7} />
          <Ring size={295} delay={0.35} opacity={0.45} dashed />
          <Ring size={370} delay={0.5} opacity={0.25} />

          {/* Orbiting dot — primary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ opacity: { delay: 1 }, rotate: { duration: 10, repeat: Infinity, ease: "linear" } }}
            style={{ width: 295, height: 295 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-primary" />
          </motion.div>

          {/* Orbiting dot — emerald */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: -360 }}
            transition={{ opacity: { delay: 1.2 }, rotate: { duration: 16, repeat: Infinity, ease: "linear" } }}
            style={{ width: 220, height: 220 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-emerald-400 dark:bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          </motion.div>

          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, type: "spring", bounce: 0.25 }}
            className="relative z-10 w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden"
            style={{ boxShadow: "0 0 0 4px var(--background), 0 0 0 6px var(--primary), 0 24px 80px -12px color-mix(in srgb, var(--primary) 25%, transparent)" }}
          >
            <img
              src={photo || "/profile_placeholder.png"}
              alt="Parfait Eric"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
          </motion.div>

          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, x: 16, y: -8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1, duration: 0.6, type: "spring" }}
            className="absolute -right-2 -top-2 z-20"
          >
            <div className="bg-card/95 backdrop-blur-lg border border-border rounded-full px-3 py-1.5 flex items-center gap-2 shadow-xl text-[11px] font-bold whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-foreground">Disponible</span>
            </div>
          </motion.div>

          {/* Dev badge */}
          <motion.div
            initial={{ opacity: 0, x: -16, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6, type: "spring" }}
            className="absolute -left-5 bottom-2 z-20"
          >
            <div className="bg-gradient-primary rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg text-[10px] font-extrabold uppercase tracking-widest text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              Full-Stack
            </div>
          </motion.div>
        </div>

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pill-tag mb-8"
        >
          <Sparkles size={10} className="text-primary" />
          {t.home.heroTag}
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(40px,8.5vw,88px)] font-serif leading-[0.97] tracking-[-0.03em] mb-8"
        >
          {t.home.heroTitle1}{" "}
          {t.home.heroTitle2}{" "}
          <span className="italic text-gradient-primary">
            {t.home.heroTitle3}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-[17px] md:text-[19px] text-foreground/60 leading-relaxed max-w-xl mx-auto mb-12 text-balance"
        >
          {t.home.heroDesc1}. {t.home.heroDesc2}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <Link
              href="/projects"
              className="group relative flex items-center gap-3 text-white px-9 py-4 rounded-full font-extrabold text-[12px] uppercase tracking-widest shadow-primary overflow-hidden shimmer hover:scale-[1.03] transition-transform bg-gradient-primary"
            >
              {t.home.myProjects}
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/contact"
              className="flex items-center gap-3 px-9 py-4 rounded-full border border-border font-extrabold text-[12px] uppercase tracking-widest hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-300"
            >
              <Mail size={14} />
              {t.home.contact}
            </Link>
          </Magnetic>
        </motion.div>

        {/* Floating stat badges */}
        <div className="hidden xl:block">
          <StatBadge value="40+" label="Projets livrés" icon="⚡" className="left-0 top-1/2 -translate-y-12 animate-float" />
          <StatBadge value="5+ ans" label="D'expérience" icon="✦" className="right-0 top-1/2 translate-y-8 animate-float-delay" />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary/40"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.25em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

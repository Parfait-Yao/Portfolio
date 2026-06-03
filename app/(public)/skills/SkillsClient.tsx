"use client"
import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"

const CategoryConfig: Record<string, { color: string; bg: string; bar: string; glow: string; icon: React.ReactNode }> = {
  Frontend: {
    color: "text-blue-500",
    bg: "bg-blue-500/8 dark:bg-blue-500/10",
    bar: "bg-gradient-to-r from-blue-500 to-sky-400",
    glow: "shadow-[0_0_16px_rgba(59,130,246,0.5)]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M7 10l3 3-3 3M13 10h4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  Backend: {
    color: "text-emerald-500",
    bg: "bg-emerald-500/8 dark:bg-emerald-500/10",
    bar: "bg-gradient-to-r from-emerald-500 to-teal-400",
    glow: "shadow-[0_0_16px_rgba(16,185,129,0.5)]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="5" rx="1" /><rect x="2" y="10" width="20" height="5" rx="1" /><rect x="2" y="17" width="20" height="5" rx="1" />
        <circle cx="18" cy="5.5" r="1" fill="currentColor" /><circle cx="18" cy="12.5" r="1" fill="currentColor" /><circle cx="18" cy="19.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  DevOps: {
    color: "text-amber-500",
    bg: "bg-amber-500/8 dark:bg-amber-500/10",
    bar: "bg-gradient-to-r from-amber-500 to-orange-400",
    glow: "shadow-[0_0_16px_rgba(245,158,11,0.5)]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  Design: {
    color: "text-purple-500",
    bg: "bg-purple-500/8 dark:bg-purple-500/10",
    bar: "bg-gradient-to-r from-purple-500 to-pink-400",
    glow: "shadow-[0_0_16px_rgba(168,85,247,0.5)]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
        <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" strokeLinecap="round" />
      </svg>
    ),
  },
}

function SkillBar({ skill, barClass, glowClass }: { skill: any; barClass: string; glowClass: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="group/skill">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[13px] font-semibold text-foreground/70 group-hover/skill:text-foreground transition-colors">{skill.name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-[11px] font-extrabold tabular-nums text-foreground/30"
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="h-[5px] w-full bg-foreground/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className={`h-full rounded-full ${barClass} ${skill.level >= 80 ? glowClass : ''} relative overflow-hidden`}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={inView ? { x: "200%" } : {}}
            transition={{ duration: 1.2, delay: 1, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  )
}

const categories = ["Frontend", "Backend", "DevOps", "Design"]

export default function SkillsClient({ skillsData, noSkillsLabel }: { skillsData: any[]; noSkillsLabel: string }) {
  if (skillsData.length === 0) {
    return (
      <div className="py-24 text-center bg-card border border-dashed border-border rounded-3xl">
        <p className="text-foreground/30 text-sm">{noSkillsLabel}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:pb-10">
      {categories.map((cat, index) => {
        const catSkills = skillsData.filter((s: any) => s.category === cat)
        if (catSkills.length === 0) return null

        const cfg = CategoryConfig[cat] || CategoryConfig.Frontend
        const avg = Math.round(catSkills.reduce((a: number, s: any) => a + s.level, 0) / catSkills.length)

        return (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative bg-card border border-border rounded-[28px] p-8 overflow-hidden hover:border-primary/20 hover:shadow-[0_24px_70px_-12px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_24px_70px_-12px_rgba(0,0,0,0.55)] transition-all duration-500 hover:-translate-y-1 ${index % 2 !== 0 ? "md:translate-y-8" : ""}`}
          >
            {/* Ambient top glow */}
            <div className={`absolute top-0 right-0 w-56 h-56 ${cfg.bg} rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -mr-20 -mt-20`} />

            {/* Top accent line */}
            <div className={`absolute top-0 left-8 right-8 h-px ${cfg.bar} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

            {/* ── Header ── */}
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${cfg.bg} ${cfg.color} rounded-2xl flex items-center justify-center border border-current/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-400`}>
                  {cfg.icon}
                </div>
                <div>
                  <h2 className="text-xl font-serif text-foreground">{cat}</h2>
                  <p className={`text-[10px] font-extrabold uppercase tracking-widest ${cfg.color} opacity-60 mt-0.5`}>
                    {catSkills.length} skill{catSkills.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Average score */}
              <div className={`w-12 h-12 rounded-2xl ${cfg.bg} border border-current/10 flex items-center justify-center ${cfg.color}`}>
                <span className="text-[13px] font-extrabold tabular-nums">{avg}</span>
              </div>
            </div>

            {/* ── Skills ── */}
            <div className="flex flex-col gap-5 relative z-10">
              {catSkills.map((skill: any) => (
                <SkillBar key={skill.id} skill={skill} barClass={cfg.bar} glowClass={cfg.glow} />
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

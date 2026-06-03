"use client"
import React, { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { MapPin, Mail } from "lucide-react"

function useCounter(target: number, inView: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let c = 0
    const step = Math.max(1, Math.floor(target / 40))
    const id = setInterval(() => {
      c = Math.min(c + step, target)
      setCount(c)
      if (c >= target) clearInterval(id)
    }, 35)
    return () => clearInterval(id)
  }, [inView, target])
  return count
}

function StatBlock({ value, label, suffix = "+" }: { value: number; label: string; suffix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useCounter(value, inView)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="group relative bg-card border border-border rounded-2xl p-6 overflow-hidden hover:border-primary/20 transition-all duration-300 hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.45)]"
    >
      <div className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <p className="font-serif text-5xl text-foreground mb-2">{count}{suffix}</p>
      <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/35">{label}</p>
    </motion.div>
  )
}

export default function AboutClient({ about, t }: { about: any; t: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24 items-start">

      {/* ── LEFT ── */}
      <div className="space-y-10 lg:sticky lg:top-32">

        {/* Photo with dramatic frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative group"
        >
          <div className="aspect-[4/5] rounded-[32px] overflow-hidden bg-muted border border-border shadow-2xl relative">
            {about?.photo ? (
              <img
                src={about.photo}
                alt="Parfait Eric"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-[1.04] group-hover:scale-100"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-serif text-7xl text-foreground/8">PE</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Status overlay badge */}
            <div className="absolute bottom-5 left-5 right-5 translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <div className="bg-black/65 dark:bg-black/75 backdrop-blur-md rounded-2xl px-4 py-3 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white text-[11px] font-bold tracking-widest">Disponible · Freelance</span>
              </div>
            </div>
          </div>

          {/* Decorative dots */}
          <div className="absolute -bottom-4 -right-4 opacity-30 pointer-events-none">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="currentColor" className="text-foreground/15">
              {[0,1,2,3].map(r => [0,1,2,3].map(c => (
                <circle key={`${r}-${c}`} cx={c*16+8} cy={r*16+8} r="2" />
              )))}
            </svg>
          </div>
        </motion.div>

        {/* Contact */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-foreground/30 mb-4">{t.aboutPage.contactTitle}</h3>
            <div className="space-y-3">
              {[
                { icon: Mail,   value: about?.email    || 'contact@example.com', href: `mailto:${about?.email || ''}`, color: "text-blue-500",   bg: "bg-blue-500/8" },
                { icon: MapPin, value: about?.location || 'Abidjan, CI',         href: undefined,                      color: "text-rose-500",   bg: "bg-rose-500/8" },
              ].map((item, i) => (
                <div key={i}>
                  {item.href ? (
                    <a href={item.href} className="flex items-center gap-3 group/l">
                      <div className={`w-8 h-8 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 group-hover/l:scale-110 transition-transform`}>
                        <item.icon size={13} strokeWidth={2} />
                      </div>
                      <span className="text-[12px] font-semibold text-foreground/60 group-hover/l:text-foreground transition-colors truncate">{item.value}</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                        <item.icon size={13} strokeWidth={2} />
                      </div>
                      <span className="text-[12px] font-semibold text-foreground/60 truncate">{item.value}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-foreground/30 mb-4">{t.aboutPage.socialTitle}</h3>
            <div className="flex gap-3">
              {[
                {
                  href: about?.github || "#",
                  label: "GitHub",
                  icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
                  hover: "hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black",
                },
                {
                  href: about?.linkedin || "#",
                  label: "LinkedIn",
                  icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                  hover: "hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]",
                },
              ].map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                  whileHover={{ y: -3 }}
                  className={`w-11 h-11 bg-foreground/4 border border-border rounded-2xl flex items-center justify-center text-foreground/40 transition-all duration-200 ${s.hover}`}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div className="pt-0 md:pt-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[clamp(28px,4vw,44px)] font-serif leading-[1.15] mb-10"
        >
          {t.aboutPage.contentTitle1} <br />
          <span className="text-foreground/30 italic">{t.aboutPage.contentTitle2}</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[16px] md:text-[18px] text-foreground/55 leading-[1.8] space-y-5 whitespace-pre-line max-w-lg"
        >
          {about?.bio || "Biographie en cours de rédaction..."}
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-16">
          <StatBlock value={5}  label={t.aboutPage.stat1} />
          <StatBlock value={40} label={t.aboutPage.stat2} />
        </div>

        {/* Availability banner */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-5 rounded-2xl bg-emerald-500/6 dark:bg-emerald-500/8 border border-emerald-500/15 flex items-center gap-4"
        >
          <div className="w-10 h-10 bg-emerald-500/12 rounded-xl flex items-center justify-center shrink-0">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div>
            <p className="text-[13px] font-bold text-foreground">Disponible pour nouveaux projets</p>
            <p className="text-[11px] text-foreground/40 mt-0.5">Freelance · CDD · CDI · Remote</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

import React from "react"
import Section from "@/components/public/Section"
import ProjectCard from "@/components/public/ProjectCard"
import TechCell from "@/components/public/TechCell"
import Link from "next/link"
import { ArrowRight, Layout, Server, Cpu, ChevronRight, Sparkles, Zap, Smartphone, Box } from "lucide-react"
import Hero from "@/components/public/Hero"
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

const techIcons: Record<string, { label: string }> = {
  'Next.js':    { label: 'Framework' },
  'React':      { label: 'Library' },
  'TypeScript': { label: 'Language' },
  'Prisma':     { label: 'ORM' },
  'Tailwind':   { label: 'Styling' },
  'Node.js':    { label: 'Runtime' },
  'PostgreSQL': { label: 'Database' },
  'Three.js':   { label: 'Graphics' },
}

/* ── Decorative process SVG ── */
function ProcessSVG() {
  return (
    <svg viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-80">
      <circle cx="180" cy="180" r="160" stroke="currentColor" strokeOpacity="0.04" strokeWidth="1" />
      <circle cx="180" cy="180" r="120" stroke="currentColor" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="5 4" />
      <circle cx="180" cy="180" r="80"  stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" />
      {/* Center */}
      <circle cx="180" cy="180" r="32" fill="currentColor" fillOpacity="0.05" />
      <text x="180" y="186" textAnchor="middle" fontSize="16" fill="currentColor" fillOpacity="0.35" fontFamily="monospace">{`</>`}</text>
      {/* Orbit nodes */}
      <circle cx="180" cy="60"  r="24" fill="#6366f1" fillOpacity="0.12" /><text x="180" y="66"  textAnchor="middle" fontSize="12" fill="#6366f1" fillOpacity="0.7">✦</text>
      <circle cx="300" cy="180" r="24" fill="#10b981" fillOpacity="0.12" /><text x="300" y="186" textAnchor="middle" fontSize="12" fill="#10b981" fillOpacity="0.7">⚡</text>
      <circle cx="180" cy="300" r="24" fill="#f59e0b" fillOpacity="0.12" /><text x="180" y="306" textAnchor="middle" fontSize="12" fill="#f59e0b" fillOpacity="0.7">🚀</text>
      <circle cx="60"  cy="180" r="24" fill="#3b82f6" fillOpacity="0.12" /><text x="60"  y="186" textAnchor="middle" fontSize="12" fill="#3b82f6" fillOpacity="0.7">✓</text>
      {/* Lines */}
      <line x1="180" y1="84"  x2="180" y2="148" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" strokeDasharray="4 3" />
      <line x1="276" y1="180" x2="212" y2="180" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" strokeDasharray="4 3" />
      <line x1="180" y1="276" x2="180" y2="212" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" strokeDasharray="4 3" />
      <line x1="84"  y1="180" x2="148" y2="180" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" strokeDasharray="4 3" />
    </svg>
  )
}

export default async function HomePage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('app-language')?.value as 'fr' | 'en') || 'fr'

  const { translations } = await import('@/lib/translations')
  const { prisma }       = await import("@/lib/prisma")
  const t = translations[locale]

  let featuredProjects: any[] = []
  let about: any = null

  try {
    const results = await Promise.allSettled([
      prisma.project.findMany({ where: { featured: true }, take: 3, orderBy: { order: 'asc' } }),
      prisma.about.findFirst()
    ])
    if (results[0].status === 'fulfilled') featuredProjects = results[0].value
    if (results[1].status === 'fulfilled') about = results[1].value
  } catch (error) {
    console.error("Database connection failed", error)
  }

  return (
    <div className="bg-background min-h-screen">
      <Hero photo={about?.photo} />

      {/* ── EXPERTISE BENTO ── */}
      <Section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div>
              <span className="pill-tag mb-5">{t.home.expertise}</span>
              <h2>{t.home.techMastered} <span className="text-foreground/30 italic">{t.home.techMasteredSub}</span></h2>
            </div>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Layout, title: t.home.cleanArch,   desc: t.home.cleanArchDesc,   color: "text-primary",   bg: "bg-primary/10",  border: "group-hover:border-primary/25"  },
              { icon: Server, title: t.home.performance,  desc: t.home.performanceDesc, color: "text-secondary", bg: "bg-secondary/10", border: "group-hover:border-secondary/25" },
              { icon: Cpu,    title: t.home.mobileFirst,  desc: t.home.mobileFirstDesc, color: "text-amber-500", bg: "bg-amber-500/10", border: "group-hover:border-amber-500/25" },
            ].map((card, i) => (
              <div key={i} className={`group relative bg-card border border-border ${card.border} p-9 rounded-[28px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_80px_-16px_color-mix(in_srgb,var(--primary)_15%,transparent)] ${i === 1 ? "md:translate-y-5" : ""}`}>
                <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,color-mix(in_srgb,var(--primary)_5%,transparent),transparent_60%)]" />
                <div className="absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-7 group-hover:scale-110 group-hover:rotate-3 transition-all duration-400 border border-current/10 relative z-10`}>
                  <card.icon size={22} strokeWidth={1.5} />
                </div>
                <div className="w-6 h-[1.5px] rounded-full mb-5 group-hover:w-10 transition-all duration-400 bg-gradient-to-r from-primary to-transparent" />
                <h3 className="text-[17px] font-bold mb-3 relative z-10">{card.title}</h3>
                <p className="text-[13px] text-foreground/55 leading-relaxed relative z-10">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── TECH ECOSYSTEM ── */}
      <Section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-primary/2 rounded-full blur-[140px]" />
        </div>
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <span className="pill-tag mb-6 mx-auto">{t.home.approach}</span>
          <h2 className="mb-4">{t.home.ecosystem}</h2>
          <p className="text-foreground/40 text-[15px] max-w-sm mx-auto leading-relaxed mb-16">
            Stack soigneusement sélectionné pour des performances optimales.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.entries(techIcons).map(([name, { label }]) => (
              <TechCell key={name} name={name} label={label} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── FEATURED PROJECTS ── */}
      <Section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-14">
            <div>
              <span className="pill-tag mb-5">{t.home.featuredTag}</span>
              <h2>{t.home.portfolioLabel}</h2>
            </div>
            <Link href="/projects" className="group flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest text-foreground/35 hover:text-foreground transition-colors mb-1">
              {t.home.viewCollection}
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredProjects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── METHODOLOGY ── */}
      <Section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Illustration */}
            <div className="relative group order-2 lg:order-1">
              <div className="aspect-square rounded-[40px] overflow-hidden bg-muted border border-border shadow-2xl relative z-10">
                <img
                  src="/methodology_process_photo_1777160679780.png"
                  alt="Methodology"
                  className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                />
                {/* SVG overlay */}
                <div className="absolute inset-0 text-foreground pointer-events-none">
                  <ProcessSVG />
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-5 -right-5 z-20 animate-float">
                <div className="bg-card/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                    <span className="text-indigo-500 text-sm">✦</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-foreground">Design First</p>
                    <p className="text-[9px] text-foreground/35 mt-0.5">UI/UX focused</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-5 z-20 animate-float-delay">
                <div className="bg-card/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                    <span className="text-emerald-500 text-sm">⚡</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-foreground">TypeScript</p>
                    <p className="text-[9px] text-foreground/35 mt-0.5">100% type safe</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-12 -left-12 w-48 h-48 bg-indigo-500/6 dark:bg-indigo-500/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/6 dark:bg-blue-500/10 rounded-full blur-3xl -z-10" />
            </div>

            {/* Text */}
            <div className="space-y-10 order-1 lg:order-2">
              <div>
                <span className="pill-tag mb-5">{t.home.methodology}</span>
                <h2 className="mb-5">
                  {t.home.artisanal} <br />
                  <span className="text-foreground/30 italic">{t.home.digital}</span>
                </h2>
                <p className="text-[16px] text-foreground/50 leading-relaxed">{t.home.methodologyDesc}</p>
              </div>

              <div className="space-y-3">
                {[
                  { icon: Box,        title: t.home.cleanArch,   desc: t.home.cleanArchDesc,   color: "text-indigo-500",  bg: "bg-indigo-500/10" },
                  { icon: Zap,        title: t.home.performance, desc: t.home.performanceDesc, color: "text-amber-500",   bg: "bg-amber-500/10" },
                  { icon: Smartphone, title: t.home.mobileFirst, desc: t.home.mobileFirstDesc, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-foreground/3 transition-colors group/step cursor-default border border-transparent hover:border-border">
                    <div className={`w-10 h-10 shrink-0 rounded-xl ${step.bg} ${step.color} flex items-center justify-center group-hover/step:scale-110 transition-transform duration-300`}>
                      <step.icon size={17} strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold mb-1 group-hover/step:text-foreground text-foreground/80 transition-colors">{step.title}</h3>
                      <p className="text-[12px] text-foreground/40 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── CTA FINAL ── */}
      <div className="mx-4 md:mx-10 mb-10 rounded-[40px] overflow-hidden bg-gradient-cta">
      <Section className="text-center py-28 relative noise-overlay">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Concentric rings */}
          {[500, 380, 260].map((size, i) => (
            <div key={i}
              style={{ width: size, height: size }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/4"
            />
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/4 rounded-full blur-[100px]" />
          {/* Floating stars */}
          {["top-10 left-16", "top-14 right-24", "bottom-10 left-40", "bottom-12 right-14"].map((pos, i) => (
            <div key={i} className={`absolute ${pos} opacity-20`}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                <path d="M7 0l1.4 5.6L14 7l-5.6 1.4L7 14l-1.4-5.6L0 7l5.6-1.4z" />
              </svg>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/8 border border-white/10 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/60 mb-10">
            <Sparkles size={11} /> {t.home.startProject}
          </div>
          <h2 className="text-[clamp(34px,6vw,68px)] leading-[1.05] font-serif mb-12 text-white">
            {t.home.readyToStart} <br />
            <span className="text-white/30 italic">{t.home.readyToStartSub}</span>
          </h2>
          <Link href="/contact"
            className="relative overflow-hidden bg-background text-foreground px-12 py-5 rounded-full font-extrabold hover:bg-muted transition-all inline-flex items-center gap-4 text-[13px] uppercase tracking-widest hover:scale-105 active:scale-95 shadow-2xl group shimmer"
          >
            {t.home.contactUs}
            <ChevronRight size={17} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Section>
      </div>
    </div>
  )
}

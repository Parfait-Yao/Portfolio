import React from "react"
import { GraduationCap, Briefcase, Zap, Cpu, Rocket, ChevronRight, BookOpen } from "lucide-react"
import Section from "@/components/public/Section"
import ExperienceList from "@/components/public/ExperienceList"
import Link from "next/link"
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function ExperiencePage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('app-language')?.value as 'fr' | 'en') || 'fr'

  const { translations } = await import('@/lib/translations')
  const { prisma }       = await import("@/lib/prisma")
  const t = translations[locale]

  let experiences: any[] = []
  let education:   any[] = []

  try {
    experiences = await prisma.experience.findMany({ orderBy: { startDate: 'desc' } })
    education   = await prisma.education.findMany({ orderBy: { startDate: 'desc' } })
  } catch (error) {
    console.error("Failed to fetch experience/education:", error)
  }

  if (experiences.length === 0) {
    experiences = [{
      id: 'preview-1',
      role: 'Lead Développeur Fullstack',
      company: 'Digital Vision Corp',
      location: 'Paris / Remote',
      startDate: new Date('2022-03-01'),
      endDate: null,
      current: true,
      description: "Direction technique d'une équipe de 8 développeurs sur la refonte complète de l'écosystème e-commerce.",
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
      likes: 42
    }] as any[]
  }

  const stats = [
    { icon: Zap,    label: "Performance",  desc: "Optimisation constante des flux et temps de réponse." },
    { icon: Cpu,    label: "Architecture", desc: "Conception de systèmes robustes et scalables." },
    { icon: Rocket, label: "Innovation",   desc: "Veille technologique et intégration de solutions modernes." },
  ]

  return (
    <div className="bg-background min-h-screen pb-20 aurora-bg">
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      {/* ── Header ── */}
      <Section className="pt-[140px] pb-[60px] md:pt-[180px] md:pb-[80px]">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <span className="pill-tag mb-6">Parcours & Expertise</span>
              <h1 className="text-[clamp(38px,7vw,68px)] font-serif leading-[1.0] tracking-tight text-foreground">
                Expériences<br />
                <span className="text-foreground/30 italic">Professionnelles.</span>
              </h1>
            </div>
            <p className="text-[17px] text-foreground/50 leading-relaxed max-w-md">
              Une rétrospective de mon évolution technique, des défis relevés et des projets menés à bien.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mt-16">
            {[
              { value: `${experiences.length}+`, label: "Expériences" },
              { value: `${education.length}+`,   label: "Formations" },
              { value: "5+",                     label: "Années" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <p className="font-serif text-4xl text-foreground">{s.value}</p>
                <div className="w-px h-8 bg-border" />
                <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Experience Timeline ── */}
      <Section className="pb-24 pt-0">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center">
              <Briefcase size={18} className="text-primary/60" />
            </div>
            <h2 className="font-serif text-2xl text-foreground">Chronologie Pro</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <ExperienceList experiences={experiences} />
        </div>
      </Section>

      {/* ── Education ── */}
      {education.length > 0 && (
        <Section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="flex items-center gap-4 mb-16">
              <div className="w-10 h-10 rounded-xl bg-foreground/5 border border-border flex items-center justify-center">
                <GraduationCap size={18} className="text-foreground/50" />
              </div>
              <h2 className="font-serif text-2xl text-foreground">Formation Académique</h2>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {education.map((edu: any, i: number) => (
                <div
                  key={edu.id}
                  className="group relative bg-card border border-border rounded-[24px] p-7 hover:border-primary/20 transition-all duration-400 hover:shadow-[0_16px_60px_-12px_rgba(99,102,241,0.12)] overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-primary/8 border border-primary/12 flex items-center justify-center shrink-0">
                      <BookOpen size={14} className="text-primary/50" />
                    </div>
                    <span className="text-[10px] font-extrabold text-primary/50 uppercase tracking-[0.18em]">
                      {new Date(edu.startDate).getFullYear()} — {edu.endDate ? new Date(edu.endDate).getFullYear() : "Présent"}
                    </span>
                  </div>

                  <h4 className="text-[17px] font-bold text-foreground mb-1 leading-tight">{edu.degree}</h4>
                  <p className="text-[11px] font-extrabold text-foreground/35 uppercase tracking-widest mb-4">{edu.school}</p>
                  {edu.field && <p className="text-[13px] text-foreground/40 mb-3">{edu.field}</p>}
                  {edu.description && (
                    <p className="text-[13px] text-foreground/45 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── Key Concepts Bento ── */}
      <Section className="py-20">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="group relative bg-card border border-border rounded-[24px] p-8 text-center overflow-hidden hover:border-primary/20 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_16px_50px_-12px_rgba(99,102,241,0.12)]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px]" />
                <div className="w-12 h-12 bg-primary/8 border border-primary/12 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:border-primary/20 transition-all duration-300 relative z-10">
                  <s.icon size={20} className="text-primary/50 group-hover:text-primary/70 transition-colors" />
                </div>
                <h3 className="font-clash font-bold text-[13px] uppercase tracking-widest mb-3 relative z-10">{s.label}</h3>
                <p className="text-[12px] text-foreground/40 leading-relaxed relative z-10">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <div className="mx-4 md:mx-10 mb-10 rounded-[40px] overflow-hidden bg-gradient-cta">
      <Section className="text-center py-24 relative noise-overlay">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] border border-white/5 rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-primary-foreground mb-10 text-[clamp(28px,5vw,52px)] leading-[1.05]">
            {t.home.readyToStart} <br />
            <span className="text-primary-foreground/40 italic">{t.home.readyToStartSub}</span>
          </h2>
          <Link href="/contact"
            className="bg-background text-foreground px-12 py-5 rounded-full font-extrabold hover:bg-muted transition-all inline-flex items-center gap-4 text-[13px] uppercase tracking-widest hover:scale-105 active:scale-95 shadow-2xl"
          >
            {t.home.contactUs} <ChevronRight size={17} strokeWidth={2.5} />
          </Link>
        </div>
      </Section>
      </div>
    </div>
  )
}

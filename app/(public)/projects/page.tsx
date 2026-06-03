import React from "react"
import ProjectList from "@/components/public/ProjectList"
import Section from "@/components/public/Section"
import Link from "next/link"
import { ChevronRight, Sparkles } from "lucide-react"
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('app-language')?.value as 'fr' | 'en') || 'fr'

  const { translations } = await import('@/lib/translations')
  const { prisma }       = await import("@/lib/prisma")
  const t = translations[locale]

  let projects: any[] = []
  try {
    projects = await prisma.project.findMany({
      orderBy: [{ featured: 'desc' }, { order: 'asc' }]
    })
  } catch (error) {
    console.error("Failed to fetch projects:", error)
  }

  if (projects.length === 0) {
    projects = [
      { id: 'dummy-1', title: 'SaaS Platform', description: 'Plateforme fullstack performante avec intégration de paiements et dashboard analytique temps réel.', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop', tags: ['Next.js', 'Prisma', 'TypeScript'], featured: true,  likes: 142 },
      { id: 'dummy-2', title: 'E-commerce App',  description: 'Application mobile-first avec panier, checkout Stripe et système de gestion de contenu headless.', imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop', tags: ['React', 'Tailwind', 'Node.js'],   featured: true,  likes: 64  },
      { id: 'dummy-3', title: 'Portfolio Design', description: 'Design minimaliste et animations fluides pour une agence créative internationale.', imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop', tags: ['UI/UX', 'Framer', 'Figma'],        featured: true,  likes: 89  },
      { id: 'dummy-4', title: 'FinTech Dashboard', description: 'Dashboard financier interactif avec visualisation de données et graphiques en temps réel.', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop', tags: ['React', 'D3.js', 'TypeScript'],   featured: false, likes: 215 },
      { id: 'dummy-5', title: 'Sport Social Network', description: 'Connectez-vous avec des partenaires de sport autour de chez vous grâce à la géolocalisation.', imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop', tags: ['Next.js', 'Supabase'],             featured: false, likes: 58  },
      { id: 'dummy-6', title: 'Agence Voyage UI',  description: "Refonte complète de l'expérience utilisateur pour une agence de voyage parisienne haut de gamme.", imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop', tags: ['Figma', 'UI/UX'],                  featured: false, likes: 104 },
    ] as any[]
  }

  return (
    <div className="bg-background min-h-screen aurora-bg">
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      {/* ── Header ── */}
      <Section className="pt-[140px] pb-[60px] md:pt-[180px] md:pb-[80px]">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <span className="pill-tag mb-6">{t.projectsPage.tag}</span>
              <h1 className="mb-0">
                {t.projectsPage.title1}{" "}
                <span className="text-foreground/30 italic">{t.projectsPage.title2}</span>
              </h1>
            </div>
            <p className="text-[17px] text-foreground/50 leading-relaxed max-w-md pb-2">
              {t.projectsPage.desc}
            </p>
          </div>

          {/* ── Stats strip ── */}
          <div className="flex flex-wrap items-center gap-8 mt-14 pt-10 border-t border-border">
            {[
              { value: `${projects.filter(p => p.featured).length}`, label: "Featured" },
              { value: `${projects.length}`,                           label: "Total" },
              { value: `${[...new Set(projects.flatMap(p => p.tags || []))].length}+`, label: "Technologies" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="font-serif text-3xl text-foreground">{s.value}</span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-foreground/30">{s.label}</span>
                {i < 2 && <div className="w-px h-6 bg-border ml-2" />}
              </div>
            ))}

            {/* Sparkle badge */}
            <div className="ml-auto hidden sm:flex items-center gap-2 px-4 py-2 bg-primary/6 border border-primary/12 rounded-full">
              <Sparkles size={12} className="text-primary/60" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary/70">Tous mes projets</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Projects grid ── */}
      <Section className="pb-[100px] pt-0">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <ProjectList initialProjects={projects} />
        </div>
      </Section>

      {/* ── CTA ── */}
      <div className="mx-4 md:mx-10 mb-10 rounded-[40px] overflow-hidden bg-gradient-cta">
      <Section className="text-center py-24 relative noise-overlay">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[440, 320, 200].map((s, i) => (
            <div key={i}
              style={{ width: s, height: s }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/4"
            />
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/4 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-primary-foreground mb-10 text-[clamp(28px,5vw,52px)] leading-[1.05] font-serif">
            {t.projectsPage.contactTitle1} <br />
            <span className="text-primary-foreground/35 italic">{t.projectsPage.contactTitle2}</span>
          </h2>
          <Link
            href="/contact"
            className="bg-background text-foreground px-12 py-5 rounded-full font-extrabold hover:bg-muted transition-all inline-flex items-center gap-4 text-[13px] uppercase tracking-widest hover:scale-105 active:scale-95 shadow-2xl shimmer"
          >
            {t.projectsPage.contactBtn} <ChevronRight size={17} strokeWidth={2.5} />
          </Link>
        </div>
      </Section>
      </div>
    </div>
  )
}

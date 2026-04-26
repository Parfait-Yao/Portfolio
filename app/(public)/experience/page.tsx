import React from "react"
import { 
  GraduationCap, 
  Briefcase,
  Cpu,
  Zap,
  Rocket,
  ChevronRight
} from "lucide-react"
import Section from "@/components/public/Section"
import ExperienceList from "@/components/public/ExperienceList"
import Link from "next/link"
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function ExperiencePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('app-language')?.value as 'fr' | 'en') || 'fr';
  
  // Imports dynamiques
  const { translations } = await import('@/lib/translations')
  const { prisma } = await import("@/lib/prisma")
  
  const t = translations[locale];

  let experiences = []
  let education = []
  
  try {
    experiences = await prisma.experience.findMany({
      orderBy: { startDate: 'desc' }
    })

    education = await prisma.education.findMany({
      orderBy: { startDate: 'desc' }
    })
  } catch (error) {
    console.error("Failed to fetch experience/education from database:", error)
  }

  // Fallback for preview if DB is empty
  if (experiences.length === 0) {
    experiences = [
      {
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
      }
    ] as any[]
  }

  return (
    <div className="bg-background min-h-screen pb-20">
      
      {/* Header Minimaliste */}
      <Section className="pt-[140px] pb-[60px] md:pt-[180px] md:pb-[80px]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-6">
            <span className="pill-tag px-6 py-2 bg-primary/10 text-primary border-none text-[11px] font-bold uppercase tracking-[0.2em]">
              Parcours & Expertise
            </span>
            <h1 className="text-[clamp(40px,6vw,72px)] leading-none font-display font-bold text-foreground">
              Expériences <span className="text-muted-foreground">Professionnelles.</span>
            </h1>
            <p className="font-body text-[18px] text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Une rétrospective de mon évolution technique, des défis relevés et des projets menés à bien au sein de diverses structures.
            </p>
          </div>
        </div>
      </Section>

      {/* Experience List Section */}
      <Section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center">
              <Briefcase size={20} />
            </div>
            <h2 className="text-2xl font-display font-bold uppercase tracking-tight">Chronologie Pro</h2>
            <div className="flex-1 h-[1px] bg-border/50" />
          </div>
          
          <ExperienceList experiences={experiences} />
        </div>
      </Section>

      {/* Education Section - Plus compacte */}
      <Section className="py-24 bg-muted/30 border-y border-border/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center">
              <GraduationCap size={20} />
            </div>
            <h2 className="text-2xl font-display font-bold uppercase tracking-tight">Formation Académique</h2>
            <div className="hidden md:block flex-1 h-[1px] bg-border/50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu: any) => (
              <div key={edu.id} className="bg-card border border-border/50 p-8 rounded-[24px] hover:border-primary/20 transition-all">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                    {new Date(edu.startDate).getFullYear()} — {edu.endDate ? new Date(edu.endDate).getFullYear() : "Présent"}
                  </span>
                </div>
                <h4 className="text-xl font-display font-bold mb-1">{edu.degree}</h4>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">{edu.school}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Key Concepts - Mini Grid */}
      <Section className="py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-8 rounded-[32px] bg-card border border-border/40 text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Zap size={24} />
            </div>
            <h3 className="font-bold uppercase tracking-widest text-sm">Performance</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Optimisation constante des flux et des temps de réponse.</p>
          </div>
          <div className="p-8 rounded-[32px] bg-card border border-border/40 text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Cpu size={24} />
            </div>
            <h3 className="font-bold uppercase tracking-widest text-sm">Architecture</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Conception de systèmes robustes et scalables.</p>
          </div>
          <div className="p-8 rounded-[32px] bg-card border border-border/40 text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Rocket size={24} />
            </div>
            <h3 className="font-bold uppercase tracking-widest text-sm">Innovation</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Veille technologique et intégration de solutions modernes.</p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary text-background rounded-[48px] mx-4 md:mx-10 mb-10 overflow-hidden shadow-2xl transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 py-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-background/10 to-transparent opacity-20 pointer-events-none" />
          
          <h2 className="text-primary-foreground mb-8 text-[clamp(28px,5vw,48px)] leading-none">
            {t.home.readyToStart} <br /> <span className="text-primary-foreground/50 italic">{t.home.readyToStartSub}</span>
          </h2>
          <Link href="/contact" className="bg-background text-primary px-10 py-4 rounded-full font-bold hover:opacity-90 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-3 text-[15px] uppercase tracking-widest shadow-xl">
             {t.home.contactUs} <ChevronRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </Section>

    </div>
  )
}

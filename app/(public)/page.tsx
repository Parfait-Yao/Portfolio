import React from "react"
import Section from "@/components/public/Section"
import ProjectCard from "@/components/public/ProjectCard"
import TechCell from "@/components/public/TechCell"
import Link from "next/link"
import { 
  ArrowRight, 
  Layout, 
  Server, 
  Cpu, 
  ChevronRight, 
  Sparkles, 
  Zap, 
  Smartphone, 
  Box 
} from "lucide-react"
import Hero from "@/components/public/Hero"
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

const techIcons: Record<string, { label: string }> = {
  'Next.js': { label: 'Framework' },
  'React': { label: 'Library' },
  'TypeScript': { label: 'Language' },
  'Prisma': { label: 'Database' },
  'Tailwind': { label: 'Styling' },
  'Node.js': { label: 'Runtime' },
  'PostgreSQL': { label: 'Storage' },
  'Three.js': { label: 'Graphics' },
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('app-language')?.value as 'fr' | 'en') || 'fr';
  
  // Imports dynamiques pour le build
  const { translations } = await import('@/lib/translations')
  const { prisma } = await import("@/lib/prisma")
  
  const t = translations[locale];

  let featuredProjects: any[] = []
  let about: any = null

  try {
    const results = await Promise.allSettled([
      prisma.project.findMany({
        where: { featured: true },
        take: 3,
        orderBy: { order: 'asc' }
      }),
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

      {/* Section Expertise */}
      <Section className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-2xl">
              <span className="pill-tag mb-6">{t.home.expertise}</span>
              <h2 className="text-foreground">{t.home.techMastered} <span className="text-foreground/40 italic">{t.home.techMasteredSub}</span></h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border p-10 rounded-[32px] hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-8">
                <Layout size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{t.home.cleanArch}</h3>
              <p className="text-muted-foreground leading-relaxed font-body text-sm">{t.home.cleanArchDesc}</p>
            </div>

            <div className="bg-card border border-border p-10 rounded-[32px] hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-purple-500/10 text-purple-500 rounded-2xl flex items-center justify-center mb-8">
                <Server size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{t.home.performance}</h3>
              <p className="text-muted-foreground leading-relaxed font-body text-sm">{t.home.performanceDesc}</p>
            </div>

            <div className="bg-card border border-border p-10 rounded-[32px] hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center mb-8">
                <Cpu size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{t.home.mobileFirst}</h3>
              <p className="text-muted-foreground leading-relaxed font-body text-sm">{t.home.mobileFirstDesc}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Tech Ecosystem */}
      <Section className="py-32">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center gap-8 mb-20">
            <div className="max-w-xl">
              <span className="pill-tag mb-6 mx-auto">{t.home.approach}</span>
              <h2 className="text-foreground">{t.home.ecosystem}</h2>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {Object.entries(techIcons).map(([name, { label }]) => (
              <TechCell key={name} name={name} label={label} />
            ))}
          </div>
        </div>
      </Section>

      {/* Featured Projects Section */}
      <Section className="py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <span className="pill-tag mb-6">{t.home.featuredTag}</span>
              <h2 className="text-foreground">{t.home.portfolioLabel}</h2>
            </div>
            <Link href="/projects" className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 mb-2 group">
              {t.home.viewCollection} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </Section>

      {/* Methodology Section */}
      <Section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="aspect-square rounded-[40px] overflow-hidden bg-muted border border-border shadow-2xl relative z-10">
                <img 
                  src="/methodology_process_photo_1777160679780.png" 
                  alt="Methodology Process" 
                  className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -z-10" />
            </div>

            <div className="space-y-12">
              <div>
                <span className="pill-tag mb-6">{t.home.methodology}</span>
                <h2 className="text-[clamp(32px,5vw,48px)] leading-[1.1] mb-6">
                  {t.home.artisanal} <br /> 
                  <span className="text-foreground/40 italic">{t.home.digital}</span>
                </h2>
                <p className="text-muted-foreground font-body text-lg leading-relaxed">
                  {t.home.methodologyDesc}
                </p>
              </div>

              <div className="space-y-8">
                {[
                  { icon: Box, title: t.home.cleanArch, desc: t.home.cleanArchDesc, color: "text-blue-500", bg: "bg-blue-500/10" },
                  { icon: Zap, title: t.home.performance, desc: t.home.performanceDesc, color: "text-amber-500", bg: "bg-amber-500/10" },
                  { icon: Smartphone, title: t.home.mobileFirst, desc: t.home.mobileFirstDesc, color: "text-emerald-500", bg: "bg-emerald-500/10" }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className={`w-12 h-12 shrink-0 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <step.icon size={20} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                      <p className="text-muted-foreground font-body text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Final */}
      <Section className="bg-primary text-primary-foreground rounded-[40px] mx-4 md:mx-10 mb-10 overflow-hidden text-center py-24 relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-[11px] font-bold uppercase tracking-widest mb-10">
            <Sparkles size={14} /> {t.home.startProject}
          </div>
          <h2 className="text-[clamp(40px,6vw,80px)] leading-[1.05] tracking-tight mb-12 text-white">
            {t.home.readyToStart} <br /> <span className="text-white/40 italic">{t.home.readyToStartSub}</span>
          </h2>
          <Link href="/contact" className="bg-background text-foreground px-12 py-5 rounded-full font-jakarta font-bold hover:bg-muted transition-all inline-flex items-center gap-4 text-[16px] uppercase tracking-widest hover:scale-105 active:scale-95 shadow-2xl">
            {t.home.contactUs} <ChevronRight size={20} strokeWidth={2.5} />
          </Link>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-white/5 rounded-full blur-[120px] -z-10" />
      </Section>
    </div>
  )
}

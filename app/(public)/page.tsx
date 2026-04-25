import React from "react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { 
  ArrowRight, 
  ChevronRight, 
  Zap, 
  Atom, 
  Code2, 
  Server, 
  Database, 
  Wind, 
  Box, 
  GitBranch, 
  Image, 
  Mail,
  Cpu,
  Briefcase,
  Code,
  ShieldCheck,
  Smartphone,
  Globe
} from "lucide-react"
import IcyProjectCard from "@/components/public/IcyProjectCard"
import ExperienceCard from "@/components/public/ExperienceCard"
import Section from "@/components/public/Section"
import TechCell from "@/components/public/TechCell"
import Magnetic from "@/components/public/Magnetic"
import Hero from "@/components/public/Hero"

import { cookies } from 'next/headers'
import { translations } from '@/lib/translations'
const techIcons: Record<string, { label: string }> = {
  'Next.js': { label: 'Framework' },
  'React': { label: 'Library' },
  'TypeScript': { label: 'Language' },
  'Node.js': { label: 'Runtime' },
  'Prisma': { label: 'ORM' },
  'Tailwind': { label: 'Design' },
  'PostgreSQL': { label: 'Database' },
  'Three.js': { label: '3D Engine' },
  'Git': { label: 'VCS' },
  'Cloudinary': { label: 'Assets' },
}

export default async function Home() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('app-language')?.value as 'fr' | 'en') || 'fr';
  const t = translations[locale];

  const about = await prisma.about.findFirst()
  let latestExperience = await prisma.experience.findFirst({
    orderBy: { startDate: 'desc' }
  })

  // Fallback for preview
  if (!latestExperience) {
    latestExperience = {
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
    } as any
  }

  let featuredProjects = await prisma.project.findMany({
    where: { featured: true },
    orderBy: { order: 'asc' },
    take: 3
  });

  if (featuredProjects.length === 0) {
    featuredProjects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3
    });
  }

  // Fallback to placeholder data
  if (featuredProjects.length === 0) {
    featuredProjects = [
      {
        id: 'dummy-1',
        title: 'SaaS Platform',
        description: 'Plateforme fullstack performante avec intégration de paiements et dashboard.',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
        tags: ['Next.js', 'Prisma'],
        featured: true,
      },
      {
        id: 'dummy-2',
        title: 'E-commerce App',
        description: 'Application mobile-first avec panier, checkout et système de gestion de contenu.',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
        tags: ['React', 'Tailwind'],
        featured: true,
      },
      {
        id: 'dummy-3',
        title: 'Portfolio Design',
        description: 'Design minimaliste et animations fluides pour une agence créative.',
        imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
        tags: ['UI/UX', 'Framer'],
        featured: true,
      }
    ] as any[];
  }

  return (
    <div className="bg-background transition-colors duration-300">
      {/* Hero Section */}
      <Section className="pt-[140px] pb-[80px] md:pt-[180px] md:pb-[120px] text-center overflow-hidden">
        <Hero 
          about={about} 
          photoFallback="/profile_placeholder.png" 
        />
      </Section>

      {/* Dynamic Experience Preview Section [NEW] */}
      {latestExperience && (
        <Section className="pb-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-12">
               <span className="pill-tag mb-4">Dernier Challenge</span>
               <h2 className="text-3xl font-display font-bold">Expérience <span className="text-muted-foreground">Récente.</span></h2>
            </div>
            <ExperienceCard experience={latestExperience} />
            <div className="mt-8 flex justify-center">
               <Link href="/experience" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  Voir tout mon parcours <ChevronRight size={14} />
               </Link>
            </div>
          </div>
        </Section>
      )}

      {/* Ecosystem Bar */}
      <section className="py-12 border-y border-border/50 bg-background transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 overflow-hidden">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/30 mb-8">
            {t.home.ecosystem}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="flex items-center gap-2 font-jakarta font-extrabold text-2xl tracking-tighter text-foreground">
               <Zap size={24} fill="currentColor" /> Vercel
             </div>
             <div className="flex items-center gap-2 font-jakarta font-extrabold text-2xl tracking-tighter text-foreground">
               <Database size={24} /> Supabase
             </div>
             <div className="flex items-center gap-2 font-jakarta font-extrabold text-2xl tracking-tighter text-foreground">
               <ShieldCheck size={24} /> Stripe
             </div>
             <div className="flex items-center gap-2 font-jakarta font-extrabold text-2xl tracking-tighter text-foreground">
               <Globe size={24} /> AWS
             </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <Section className="bg-background pt-[100px] pb-[100px] transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
          
          <div className="relative w-[300px] h-[340px] md:w-[400px] md:h-[450px] flex items-center justify-center mb-12">
            {featuredProjects[2] && (
               <div className="absolute w-[60%] aspect-square rounded-[24px] border-[6px] md:border-[8px] border-background bg-muted overflow-hidden transform -rotate-12 -translate-x-12 md:-translate-x-16 translate-y-6 shadow-lg z-10 transition-all duration-500 hover:-rotate-[15deg] hover:-translate-x-16 md:hover:-translate-x-20">
                  {featuredProjects[2].imageUrl ? (
                     <img src={featuredProjects[2].imageUrl} alt={featuredProjects[2].title} className="w-full h-full object-cover" />
                  ) : <div className="w-full h-full flex items-center justify-center text-foreground/20 italic font-serif">{t.home.portfolioLabel}</div>}
               </div>
            )}
            
            {featuredProjects[1] && (
               <div className="absolute w-[60%] aspect-square rounded-[24px] border-[6px] md:border-[8px] border-background bg-muted overflow-hidden transform rotate-12 translate-x-12 md:translate-x-16 translate-y-6 shadow-lg z-20 transition-all duration-500 hover:rotate-[15deg] hover:translate-x-16 md:hover:translate-x-20">
                  {featuredProjects[1].imageUrl ? (
                     <img src={featuredProjects[1].imageUrl} alt={featuredProjects[1].title} className="w-full h-full object-cover" />
                  ) : <div className="w-full h-full flex items-center justify-center text-foreground/20 italic font-serif">{t.home.portfolioLabel}</div>}
               </div>
            )}

            {featuredProjects[0] && (
               <div className="absolute w-[65%] aspect-square rounded-[24px] border-[8px] md:border-[10px] border-background bg-muted overflow-hidden transform z-30 shadow-2xl transition-all duration-500 hover:-translate-y-4">
                  {featuredProjects[0].imageUrl ? (
                     <img src={featuredProjects[0].imageUrl} alt={featuredProjects[0].title} className="w-full h-full object-cover" />
                  ) : <div className="w-full h-full flex items-center justify-center text-foreground/20 italic font-serif">{t.home.portfolioLabel}</div>}
               </div>
            )}
          </div>

          <div className="inline-block px-4 py-1.5 mb-16 rounded-md bg-muted/60 font-mono text-[10px] md:text-[11px] font-bold tracking-[0.15em] text-foreground/50 uppercase">
            {t.home.featuredTag}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-16 w-full text-left items-stretch">
            {featuredProjects.map((project: any) => (
              <IcyProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          <p className="text-foreground/80 md:text-[17px] mb-10 max-w-[500px] font-medium leading-relaxed">
            {t.home.featuredDesc1}<span className="text-foreground/40 font-normal">{t.home.featuredDesc2}</span>
          </p>

          <Link href="/projects" className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-jakarta font-semibold text-[14px] hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/10">
            {t.home.viewCollection}
          </Link>
          
        </div>
      </Section>

      {/* Skills / Tech Section */}
      <Section className="text-center pt-[100px] pb-0">
        <div className="max-w-6xl mx-auto px-6">
          <span className="pill-tag mb-6">
            {t.home.expertise}
          </span>
          <h2 className="mb-20 text-foreground">
            {t.home.techMastered}<span className="text-foreground/40">{t.home.techMasteredSub}</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 px-6">
            {Object.entries(techIcons).map(([name, data]) => (
              <TechCell 
                key={name}
                name={name}
                label={data.label}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Methodology Section Inspired by Model [NEW] */}
      <Section className="pb-[100px] pt-[120px]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Image Side */}
          <div className="relative aspect-[16/10] lg:aspect-[4/5] rounded-[28px] overflow-hidden bg-muted border border-border group transition-all duration-300 shadow-2xl">
             <img 
               src="/methodology_process_photo_1777160679780.png" 
               alt="Methodology" 
               className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
             
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <span className="font-serif text-5xl md:text-6xl italic text-white/40 drop-shadow-lg text-center leading-tight" dangerouslySetInnerHTML={{ __html: `${t.home.artisanal} <br /> ${t.home.digital}` }}></span>
             </div>
             
             {/* Decorative Elements */}
             <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 transition-all duration-500 group-hover:bg-white/20">
               <p className="text-white font-jakarta font-bold text-lg">{t.home.qualityPerf}</p>
               <p className="text-white/70 text-sm">{t.home.commitment}</p>
             </div>
          </div>

          {/* List Side */}
          <div className="space-y-14">
            <div>
              <span className="pill-tag mb-6 text-foreground/40">{t.home.approach}</span>
              <h2 className="mb-8 text-foreground" dangerouslySetInnerHTML={{ __html: `${t.home.methodology} <br /> <span class="text-foreground/40 underline decoration-border underline-offset-8">${t.home.methodologySub}</span>` }}></h2>
              <p className="font-body text-[18px] text-foreground/60 leading-relaxed max-w-xl">
                {t.home.methodologyDesc}
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center text-foreground/60 group-hover:bg-primary group-hover:text-background transition-all duration-500 shrink-0">
                   <Code size={24} />
                </div>
                <div>
                  <h4 className="font-jakarta font-bold text-lg text-foreground mb-1">{t.home.cleanArch}</h4>
                  <p className="text-foreground/40 text-[15px] leading-relaxed">{t.home.cleanArchDesc}</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center text-foreground/60 group-hover:bg-primary group-hover:text-background transition-all duration-500 shrink-0">
                   <Zap size={24} />
                </div>
                <div>
                  <h4 className="font-jakarta font-bold text-lg text-foreground mb-1">{t.home.performance}</h4>
                  <p className="text-foreground/40 text-[15px] leading-relaxed">{t.home.performanceDesc}</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center text-foreground/60 group-hover:bg-primary group-hover:text-background transition-all duration-500 shrink-0">
                   <Smartphone size={24} />
                </div>
                <div>
                  <h4 className="font-jakarta font-bold text-lg text-foreground mb-1">{t.home.mobileFirst}</h4>
                  <p className="text-foreground/40 text-[15px] leading-relaxed">{t.home.mobileFirstDesc}</p>
                </div>
              </div>
            </div>

            <Magnetic>
               <Link href="/contact" className="btn-primary group !px-10 !py-5">
                 {t.home.startProject} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </Magnetic>
          </div>
        </div>
      </Section>

      <Section className="bg-primary text-background rounded-[48px] mx-4 md:mx-10 mb-10 overflow-hidden shadow-2xl transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 py-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-background/10 to-transparent opacity-20 pointer-events-none" />
          
          <h2 className="text-primary-foreground mb-12 text-[clamp(32px,6vw,56px)] leading-none" dangerouslySetInnerHTML={{ __html: `${t.home.readyToStart} <br /> <span class="text-primary-foreground/50 italic">${t.home.readyToStartSub}</span>` }}>
          </h2>
          <Magnetic amount={0.15}>
            <Link href="/contact" className="bg-background text-primary px-14 py-6 rounded-full font-jakarta font-bold hover:opacity-90 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-4 text-[17px] uppercase tracking-widest shadow-xl">
               {t.home.contactUs} <ChevronRight size={22} strokeWidth={2.5} />
            </Link>
          </Magnetic>
        </div>
      </Section>
    </div>
  )
}

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
import ProjectCard from "@/components/public/ProjectCard"
import Section from "@/components/public/Section"
import TechCell from "@/components/public/TechCell"
import Magnetic from "@/components/public/Magnetic"
import Hero from "@/components/public/Hero"




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
  const about = await prisma.about.findFirst()
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

  // Fallback to placeholder data if the database is completely empty so the UI doesn't break
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

      {/* Trusted Partners / Ecosystem Bar */}
      <section className="py-12 border-y border-border/50 bg-background transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 overflow-hidden">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/30 mb-8">
            Écosystème & Partenaires
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
                  ) : <div className="w-full h-full flex items-center justify-center text-foreground/20 italic font-serif">Portfolio</div>}
               </div>
            )}
            
            {featuredProjects[1] && (
               <div className="absolute w-[60%] aspect-square rounded-[24px] border-[6px] md:border-[8px] border-background bg-muted overflow-hidden transform rotate-12 translate-x-12 md:translate-x-16 translate-y-6 shadow-lg z-20 transition-all duration-500 hover:rotate-[15deg] hover:translate-x-16 md:hover:translate-x-20">
                  {featuredProjects[1].imageUrl ? (
                     <img src={featuredProjects[1].imageUrl} alt={featuredProjects[1].title} className="w-full h-full object-cover" />
                  ) : <div className="w-full h-full flex items-center justify-center text-foreground/20 italic font-serif">Portfolio</div>}
               </div>
            )}

            {featuredProjects[0] && (
               <div className="absolute w-[65%] aspect-square rounded-[24px] border-[8px] md:border-[10px] border-background bg-muted overflow-hidden transform z-30 shadow-2xl transition-all duration-500 hover:-translate-y-4">
                  {featuredProjects[0].imageUrl ? (
                     <img src={featuredProjects[0].imageUrl} alt={featuredProjects[0].title} className="w-full h-full object-cover" />
                  ) : <div className="w-full h-full flex items-center justify-center text-foreground/20 italic font-serif">Portfolio</div>}
               </div>
            )}
          </div>

          <div className="inline-block px-4 py-1.5 mb-16 rounded-md bg-muted/60 font-mono text-[10px] md:text-[11px] font-bold tracking-[0.15em] text-foreground/50 uppercase">
            SELECTION-PROJETS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-16 w-full text-left">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          <p className="text-foreground/80 md:text-[17px] mb-10 max-w-[500px] font-medium leading-relaxed">
            Une sélection de mes travaux les plus remarquables, <span className="text-foreground/40 font-normal">conçus avec une attention particulière au design et à la performance.</span>
          </p>

          <Link href="/projects" className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-jakarta font-semibold text-[14px] hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/10">
            Voir la collection
          </Link>
          
        </div>
      </Section>

      {/* Skills / Tech Section */}
      <Section className="text-center pt-[100px] pb-0">
        <div className="max-w-6xl mx-auto px-6">
          <span className="pill-tag mb-6">
            Expertise
          </span>
          <h2 className="mb-20 text-foreground">
            Technologies <span className="text-foreground/40">maîtrisées.</span>
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
          <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-muted border border-border group transition-all duration-300">
             <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-700">
               <span className="font-serif text-5xl italic text-foreground/20">Artisanal <br /> Digital.</span>
             </div>
             {/* Decorative Elements */}
             <div className="absolute bottom-8 left-8 right-8 p-6 bg-background/20 backdrop-blur-md rounded-2xl border border-border/20 transition-colors duration-300">
               <p className="text-foreground font-jakarta font-bold text-lg">Qualité & Performance</p>
               <p className="text-foreground/60 text-sm">Engagement sur l'excellence technique à chaque étape.</p>
             </div>
          </div>

          {/* List Side */}
          <div className="space-y-14">
            <div>
              <span className="pill-tag mb-6 text-foreground/40">Approche</span>
              <h2 className="mb-8 text-foreground">Une méthodologie <br /> <span className="text-foreground/40 underline decoration-border underline-offset-8">axée sur le résultat.</span></h2>
              <p className="font-body text-[18px] text-foreground/60 leading-relaxed max-w-xl">
                Mon processus de développement allie rigueur architecturale et agilité pour transformer vos idées en produits finis exceptionnels.
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center text-foreground/60 group-hover:bg-primary group-hover:text-background transition-all duration-500 shrink-0">
                   <Code size={24} />
                </div>
                <div>
                  <h4 className="font-jakarta font-bold text-lg text-foreground mb-1">Architecture Propre</h4>
                  <p className="text-foreground/40 text-[15px] leading-relaxed">Conception de bases solides, maintenables et évolutives dès le premier pixel.</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center text-foreground/60 group-hover:bg-primary group-hover:text-background transition-all duration-500 shrink-0">
                   <Zap size={24} />
                </div>
                <div>
                  <h4 className="font-jakarta font-bold text-lg text-foreground mb-1">Performance Critique</h4>
                  <p className="text-foreground/40 text-[15px] leading-relaxed">Chaque seconde compte. J'optimise chaque application pour une vitesse de réponse instantanée.</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center text-foreground/60 group-hover:bg-primary group-hover:text-background transition-all duration-500 shrink-0">
                   <Smartphone size={24} />
                </div>
                <div>
                  <h4 className="font-jakarta font-bold text-lg text-foreground mb-1">Expérience Mobile-First</h4>
                  <p className="text-foreground/40 text-[15px] leading-relaxed">Des interfaces fluides et adaptatives conçues pour briller sur tous les écrans.</p>
                </div>
              </div>
            </div>

            <Magnetic>
               <Link href="/contact" className="btn-primary group !px-10 !py-5">
                 Commencer un projet <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </Magnetic>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary text-background rounded-[48px] mx-4 md:mx-10 mb-10 overflow-hidden shadow-2xl transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-background/10 to-transparent opacity-20 pointer-events-none" />
          
          <h2 className="text-primary-foreground mb-12 text-[clamp(32px,6vw,56px)] leading-none">
            Prêt à démarrer <br /> <span className="text-primary-foreground/50 italic">votre prochain projet ?</span>
          </h2>
          <Magnetic amount={0.15}>
            <Link href="/contact" className="bg-background text-primary px-14 py-6 rounded-full font-jakarta font-bold hover:opacity-90 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-4 text-[17px] uppercase tracking-widest shadow-xl">
               Nous contacter <ChevronRight size={22} strokeWidth={2.5} />
            </Link>
          </Magnetic>
        </div>
      </Section>
    </div>
  )
}

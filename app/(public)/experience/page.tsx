import React from "react"
import { prisma } from "@/lib/prisma"
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Zap, 
  Cpu, 
  Users, 
  GraduationCap, 
  Award,
  BookOpen,
  Rocket,
  ShieldCheck,
  Gem
} from "lucide-react"
import Section from "@/components/public/Section"
import Link from "next/link"

export default async function ExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: 'desc' }
  })

  const education = await prisma.education.findMany({
    orderBy: { startDate: 'desc' }
  })

  // Fallbacks for display
  const displayExperiences = experiences.length > 0 ? experiences : [
    {
      id: 'd1',
      role: 'Développeur Fullstack Senior',
      company: 'Tech Innovate Studio',
      description: 'Responsable de l\'architecture logicielle et de l\'optimisation des performances pour des plateformes SaaS à fort trafic. Lead tech d\'une équipe de 5 développeurs.',
      location: 'Abidjan / Remote',
      startDate: new Date('2022-01-01'),
      endDate: null,
      current: true
    },
    {
      id: 'd2',
      role: 'Développeur Frontend Web3',
      company: 'CryptoPulse Inc.',
      description: 'Développement d\'interfaces interactives et décentralisées. Utilisation poussée de Next.js et de librairies de visualisation de données.',
      location: 'Paris / Remote',
      startDate: new Date('2020-06-01'),
      endDate: new Date('2021-12-01'),
      current: false
    }
  ]

  const displayEducation = education.length > 0 ? education : [
    {
       id: 'e1',
       school: 'École Polytechnique',
       degree: 'Master en Ingénierie Logicielle',
       field: 'Computer Science',
       startDate: new Date('2018-09-01'),
       endDate: new Date('2020-07-01'),
       description: 'Spécialisation en systèmes distribués et intelligence artificielle.'
    }
  ]

  return (
    <div className="bg-background min-h-screen selection:bg-primary selection:text-primary-foreground">
      
      {/* 1. HERO SECTION - CHARACTER + TEXT */}
      <Section className="pt-[140px] pb-[80px] md:pt-[180px] md:pb-[100px]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative order-2 lg:order-1">
             <img src="/images/characters/hero.png" alt="Developer Character" className="w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="space-y-8 order-1 lg:order-2">
            <span className="pill-tag bg-foreground/5 text-foreground/40 border-none px-4 py-2">Parcours Professionnel</span>
            <h1 className="text-[clamp(40px,6vw,80px)] leading-[1.05] tracking-tight text-foreground">
              Construire <span className="text-foreground/40">votre vision.</span> <br /> 
              <span className="italic">Sans limite.</span>
            </h1>
            <p className="font-body text-[18px] text-foreground/60 leading-relaxed max-w-xl">
              Mon parcours est une quête incessante de l'excellence technique et architecturale. Chaque expérience est une brique vers la perfection digitale.
            </p>
          </div>
        </div>
      </Section>

      {/* 2. HIGHLIGHTS GRID (Small concepts) */}
      <Section className="py-20 border-y border-border bg-background/50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 text-center">
           <div className="space-y-4">
              <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <Zap className="text-black" size={28} />
              </div>
              <h3 className="font-jakarta font-bold text-lg uppercase tracking-wider">Vitesse Critique</h3>
              <p className="text-foreground/40 text-[14px]">Développement agile et performant pour un Time-to-Market réduit à son minimum.</p>
           </div>
           <div className="space-y-4">
              <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <Cpu className="text-black" size={28} />
              </div>
              <h3 className="font-jakarta font-bold text-lg uppercase tracking-wider">Architecture Propre</h3>
              <p className="text-foreground/40 text-[14px]">Conception robuste et évolutive dès le premier pixel, adaptée à vos besoins futurs.</p>
           </div>
           <div className="space-y-4">
              <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <Rocket className="text-black" size={28} />
              </div>
              <h3 className="font-jakarta font-bold text-lg uppercase tracking-wider">Expérience Ready</h3>
              <p className="text-foreground/40 text-[14px]">Des produits finis, testés et prêts pour la production à grande échelle.</p>
           </div>
        </div>
      </Section>

      {/* 3. EXPERIENCE BLOCKS - ALTERNATING */}
      <div className="space-y-0">
        {displayExperiences.map((exp, index) => (
          <Section 
            key={exp.id} 
            className={`py-[80px] md:py-[140px] ${index % 2 !== 0 ? 'bg-card' : 'bg-background'}`}
          >
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className={`space-y-8 ${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-foreground/5 rounded-2xl flex items-center justify-center">
                        <Briefcase size={22} />
                     </div>
                     <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-foreground/30 uppercase">
                        {new Date(exp.startDate).getFullYear()} — {exp.current ? "Présent" : exp.endDate ? new Date(exp.endDate).getFullYear() : ""}
                     </span>
                  </div>
                  <h2 className="text-[42px] leading-tight font-serif italic text-foreground">
                    {exp.role} <br />
                    <span className="text-foreground/30 not-italic font-jakarta text-[24px] uppercase tracking-tighter align-middle ml-2">— {exp.company}</span>
                  </h2>
                  <p className="font-body text-[17px] text-foreground/60 leading-[1.8] max-w-xl">
                    {exp.description}
                  </p>
                  <div className="flex items-center gap-6 text-[13px] font-bold text-foreground group">
                     {exp.location} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
               </div>
               
               <div className={`relative ${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* Each experience gets the dynamic rocket or team image based on order */}
                  <img 
                    src={index % 2 === 0 ? "/images/characters/rocket.png" : "/images/characters/team.png"} 
                    alt="Development Stage" 
                    className="w-full h-auto drop-shadow-3xl hover:translate-y-[-10px] transition-transform duration-700" 
                  />
               </div>
            </div>
          </Section>
        ))}
      </div>

      {/* 4. KEY QUALITIES GRID (Second set of 3) */}
      <Section className="py-20 border-y border-border bg-background/50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 text-center">
           <div className="space-y-4">
              <div className="w-16 h-16 bg-foreground/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <ShieldCheck className="text-foreground" size={28} />
              </div>
              <h3 className="font-jakarta font-bold text-lg uppercase tracking-wider">Qualité UI/UX</h3>
              <p className="text-foreground/40 text-[14px]">Design centré sur l'utilisateur pour une adoption instantanée et sans friction.</p>
           </div>
           <div className="space-y-4">
              <div className="w-16 h-16 bg-foreground/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <Users className="text-foreground" size={28} />
              </div>
              <h3 className="font-jakarta font-bold text-lg uppercase tracking-wider">Expertise Tech</h3>
              <p className="text-foreground/40 text-[14px]">Maîtrise complète de la stack moderne (React, Node, Prisma, PostgreSQL).</p>
           </div>
           <div className="space-y-4">
              <div className="w-16 h-16 bg-foreground/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <Gem className="text-foreground" size={28} />
              </div>
              <h3 className="font-jakarta font-bold text-lg uppercase tracking-wider">Code Robuste</h3>
              <p className="text-foreground/40 text-[14px]">Une qualité logicielle sans compromis, testée et maintenable sur le long terme.</p>
           </div>
        </div>
      </Section>

      {/* 5. ACADEMIC BACKGROUND - FINAL ALTERNATING SECTION */}
      <Section className="py-[120px] bg-background">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="order-2 lg:order-1">
              <img src="/images/characters/education.png" alt="Academic Background" className="w-full h-auto drop-shadow-2xl" />
           </div>
           <div className="order-1 lg:order-2 space-y-12">
              <div>
                <span className="pill-tag mb-6">Formation</span>
                <h2 className="text-[56px] leading-[1.05] tracking-tight mb-8 text-foreground">Parcours <br /> <span className="text-foreground/40">académique.</span></h2>
              </div>
              
              <div className="space-y-12">
                {displayEducation.map((edu) => (
                  <div key={edu.id} className="group relative flex gap-8">
                     <div className="w-14 h-14 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shrink-0 shadow-xl group-hover:scale-110 transition-transform">
                        <GraduationCap size={28} />
                     </div>
                     <div>
                        <div className="font-mono text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em] mb-2">
                           {new Date(edu.startDate).getFullYear()} — {edu.endDate ? new Date(edu.endDate).getFullYear() : "Présent"}
                        </div>
                        <h4 className="font-serif text-2xl mb-1 text-black">{edu.degree}</h4>
                        <div className="font-jakarta text-[14px] font-bold text-foreground/40 uppercase tracking-widest mb-4">{edu.school}</div>
                        <p className="font-body text-foreground/60 leading-relaxed text-[15px] max-w-md">
                           {edu.description}
                        </p>
                     </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary text-primary-foreground rounded-[40px] mx-4 md:mx-10 mb-10 overflow-hidden text-center py-24">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-primary-foreground mb-10 text-[64px] leading-tight tracking-tight">
            Collaborons <br /> <span className="text-primary-foreground/60 italic">ensemble.</span>
          </h2>
          <Link href="/contact" className="bg-background text-foreground px-12 py-5 rounded-full font-jakarta font-bold hover:bg-muted transition-all inline-flex items-center gap-4 text-[16px] uppercase tracking-widest hover:scale-105 active:scale-95 shadow-xl">
            Lancer un projet <ChevronRight size={20} strokeWidth={2.5} />
          </Link>
        </div>
      </Section>

    </div>
  )
}

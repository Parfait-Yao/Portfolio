import React from "react"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ArrowLeft, Briefcase, MapPin, Calendar, Heart, Clock } from "lucide-react"
import Link from "next/link"
import Section from "@/components/public/Section"

export default async function ExperienceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Try to fetch from DB
  let experience = await prisma.experience.findUnique({
    where: { id }
  })

  // Static Data Fallback for preview if not in DB
  if (!experience && id.startsWith('preview')) {
    experience = {
      id: 'preview-1',
      role: 'Lead Développeur Fullstack',
      company: 'Digital Vision Corp',
      location: 'Paris / Remote',
      startDate: new Date('2022-03-01'),
      endDate: null,
      current: true,
      description: "Direction technique d'une équipe de 8 développeurs sur la refonte complète de l'écosystème e-commerce. \n\nObjectifs atteints :\n- Réduction de 40% du temps de chargement.\n- Mise en place d'une architecture micro-services avec Next.js et NestJS.\n- Automatisation des déploiements via GitHub Actions.\n\nCette expérience m'a permis de consolider mes compétences en leadership et en architecture cloud (AWS).",
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
      likes: 42,
      order: 0
    } as any
  }

  if (!experience) notFound()

  const startDate = new Date(experience.startDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  const endDate = experience.current 
    ? "Présent" 
    : experience.endDate 
      ? new Date(experience.endDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
      : ""

  return (
    <div className="bg-background min-h-screen">
      {/* Navigation */}
      <section className="pt-24 pb-8 md:pt-32">
        <div className="max-w-4xl mx-auto px-6">
          <Link 
            href="/experience" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body text-[13px] font-bold uppercase tracking-widest mb-12 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Retour au parcours
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <Section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col gap-8">
            
            {/* Image Banner */}
            <div className="relative aspect-[21/9] w-full rounded-[32px] overflow-hidden bg-muted border border-border shadow-2xl">
              {experience.imageUrl ? (
                <img src={experience.imageUrl} alt={experience.company} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Briefcase size={80} className="text-muted-foreground/20" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <span className="px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block">
                  {experience.current ? "Poste Actuel" : "Mission Terminée"}
                </span>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                  {experience.role}
                </h1>
              </div>
            </div>

            {/* Info Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-border/50">
               <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                   <Briefcase size={12} /> Entreprise
                 </span>
                 <span className="text-lg font-bold text-foreground">{experience.company}</span>
               </div>
               <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                   <Calendar size={12} /> Période
                 </span>
                 <span className="text-lg font-bold text-foreground">{startDate} — {endDate}</span>
               </div>
               <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                   <MapPin size={12} /> Localisation
                 </span>
                 <span className="text-lg font-bold text-foreground">{experience.location}</span>
               </div>
            </div>

            {/* Description */}
            <div className="py-8">
               <div className="flex items-center gap-3 mb-8">
                 <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                   <Clock size={16} />
                 </div>
                 <h2 className="text-2xl font-display font-bold uppercase tracking-tight">Détails de la mission</h2>
               </div>
               <div className="font-body text-[18px] text-muted-foreground leading-[1.8] space-y-6 whitespace-pre-wrap max-w-3xl">
                  {experience.description}
               </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-12 border-t border-border/50">
               <div className="flex items-center gap-3">
                 <div className="flex items-center gap-2 px-6 py-3 bg-red-500/5 text-red-500 border border-red-500/20 rounded-full font-bold text-sm">
                   <Heart size={18} fill="currentColor" />
                   <span>{experience.likes} Applaudissements</span>
                 </div>
               </div>
               
               <Link href="/contact" className="px-8 py-4 bg-foreground text-background rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                 Discuter de ce profil
               </Link>
            </div>

          </div>
        </div>
      </Section>
    </div>
  )
}

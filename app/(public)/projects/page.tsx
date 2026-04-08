import React from "react"
import { prisma } from "@/lib/prisma"
import ProjectList from "@/components/public/ProjectList"
import Section from "@/components/public/Section"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cookies } from 'next/headers'
import { translations } from '@/lib/translations'

export default async function ProjectsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('app-language')?.value as 'fr' | 'en') || 'fr';
  const t = translations[locale];

  let projects = await prisma.project.findMany({
    orderBy: [
      { featured: 'desc' },
      { order: 'asc' }
    ]
  })

  // Fallback to placeholder data if the database is empty so the UI doesn't break and the user can see the design
  if (projects.length === 0) {
    projects = [
      {
        id: 'dummy-1',
        title: 'SaaS Platform',
        description: 'Plateforme fullstack performante avec intégration de paiements et dashboard.',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
        tags: ['Next.js', 'Prisma'],
        featured: true,
        likes: 142
      },
      {
        id: 'dummy-2',
        title: 'E-commerce App',
        description: 'Application mobile-first avec panier, checkout et système de gestion de contenu.',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
        tags: ['React', 'Tailwind'],
        featured: true,
        likes: 64
      },
      {
        id: 'dummy-3',
        title: 'Portfolio Design',
        description: 'Design minimaliste et animations fluides pour une agence créative.',
        imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
        tags: ['UI/UX', 'Framer'],
        featured: true,
        likes: 89
      },
      {
        id: 'dummy-4',
        title: 'Application FinTech',
        description: 'Dashboard financier interactif avec visualisation de données en temps réel.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
        tags: ['React', 'D3.js'],
        featured: false,
        likes: 215
      },
      {
        id: 'dummy-5',
        title: 'Réseau Social Sportif',
        description: 'Connectez vous avec des partenaires de sport autour de chez vous.',
        imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop',
        tags: ['Next.js', 'Supabase'],
        featured: false,
        likes: 58
      },
      {
        id: 'dummy-6',
        title: 'Agence de Voyage UI',
        description: 'Refonte complète de l\'expérience utilisateur pour une agence parisienne.',
        imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop',
        tags: ['Figma', 'UI/UX'],
        featured: false,
        likes: 104
      }
    ] as any[];
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header Section */}
      <Section className="pt-[140px] pb-[72px] md:pt-[180px] md:pb-[100px]">
        <div className="max-w-6xl mx-auto px-6">
          <span className="pill-tag mb-6">
            {t.projectsPage.tag}
          </span>
          <h1 className="mb-8 text-foreground">
            {t.projectsPage.title1} <span className="text-foreground/50">{t.projectsPage.title2}</span>
          </h1>
          <p className="font-body text-[18px] md:text-[20px] text-foreground/70 leading-relaxed max-w-2xl">
            {t.projectsPage.desc}
          </p>
        </div>
      </Section>

      {/* Projects Grid */}
      <Section className="pb-[120px] pt-0">
        <div className="max-w-6xl mx-auto px-6">
          <ProjectList initialProjects={projects} />
          
          {projects.length === 0 && (
            <div className="py-32 text-center bg-card border border-dashed border-border rounded-3xl">
              <p className="font-body text-foreground/40 font-medium">{t.projectsPage.noProjects}</p>
            </div>
          )}
        </div>
      </Section>

      {/* Contact Section Preview */}
      <Section className="bg-primary text-primary-foreground rounded-[40px] mx-4 md:mx-10 mb-10 overflow-hidden text-center py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-primary-foreground mb-10">
            {t.projectsPage.contactTitle1} <br /> <span className="text-primary-foreground/60 italic">{t.projectsPage.contactTitle2}</span>
          </h2>
          <Link href="/contact" className="bg-background text-foreground px-12 py-5 rounded-full font-jakarta font-bold hover:bg-muted transition-all inline-flex items-center gap-4 text-[16px] uppercase tracking-widest hover:scale-105 active:scale-95 shadow-xl">
            {t.projectsPage.contactBtn} <ChevronRight size={20} strokeWidth={2.5} />
          </Link>
        </div>
      </Section>
    </div>
  )
}

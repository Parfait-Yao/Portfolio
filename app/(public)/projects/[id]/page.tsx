import React from "react"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Code, Calendar, Layout } from "lucide-react"
import Link from "next/link"
import { FaGithub } from "react-icons/fa6"

interface ProjectPageProps {
  params: { id: string }
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id }
  })

  if (!project) notFound()

  return (
    <div className="bg-background min-h-screen">
      {/* Navigation & Header */}
      <section className="pt-24 pb-12 md:pt-32">
        <div className="max-w-4xl mx-auto px-6">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body text-[13px] font-medium uppercase tracking-widest mb-12 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Retour aux projets
          </Link>
          
          <span className="inline-flex items-center gap-1.5 bg-muted text-foreground/70 px-3 py-1 rounded-full text-[12px] font-medium tracking-widest uppercase mb-6">
            Projet Détail
          </span>
          <h1 className="font-serif text-[clamp(48px,7vw,80px)] leading-[1.05] tracking-tight text-foreground mb-8">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap gap-8 py-8 border-y border-border mb-12">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-[11px] font-medium tracking-widest uppercase mb-1 flex items-center gap-1.5">
                <Layout size={12} strokeWidth={1.5} /> Rôle
              </span>
              <span className="font-body text-foreground font-semibold">Développeur Fullstack</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-[11px] font-medium tracking-widest uppercase mb-1 flex items-center gap-1.5">
                <Layout size={12} strokeWidth={1.5} /> Date
              </span>
              <span className="font-body text-foreground font-semibold">{project.createdAt.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-[11px] font-medium tracking-widest uppercase mb-1 flex items-center gap-1.5">
                <Code size={12} strokeWidth={1.5} /> Stack
              </span>
              <div className="flex gap-2">
                {project.tags.map((tag: any) => (
                  <span key={tag} className="font-body text-foreground font-semibold">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Image */}
      <section className="pb-[120px]">
        <div className="max-w-6xl mx-auto px-6">
          {project.imageUrl && (
            <div className="rounded-3xl border border-border overflow-hidden bg-muted mb-12 aspect-[16/9] md:aspect-[21/9]">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            <div className="lg:col-span-8">
              <h2 className="font-serif text-4xl text-foreground mb-8">Description de l'architecture.</h2>
              <div className="font-body text-[17px] text-foreground/70 leading-[1.8] space-y-6 whitespace-pre-wrap">
                {project.longDesc || project.description}
              </div>
            </div>
            
            <div className="lg:col-span-4 lg:pl-12 flex flex-col gap-6">
              <h3 className="font-body text-[13px] font-medium tracking-widest uppercase text-muted-foreground mb-2 border-b border-border pb-4">Liens directs</h3>
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-body font-medium hover:opacity-90 transition-all flex items-center justify-center gap-3 text-sm shadow-xl"
                >
                  Voir le site live <ExternalLink size={14} strokeWidth={2} />
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-border text-foreground px-8 py-4 rounded-full font-body font-medium hover:bg-muted transition-colors flex items-center justify-center gap-3 text-sm"
                >
                  Code source via Github <FaGithub size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Segment */}
      <section className="py-[120px] bg-muted">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-[clamp(36px,5vw,64px)] leading-[1.1] mb-8 text-foreground">
            Inspiré par ce travail ? <br /> <span className="text-foreground/50">Collaborons ensemble.</span>
          </h2>
          <Link href="/contact" className="bg-primary text-primary-foreground px-10 py-5 rounded-full font-body font-medium hover:opacity-90 transition-all inline-flex items-center gap-3 text-[18px] shadow-xl">
            Lancer un projet
          </Link>
        </div>
      </section>
    </div>
  )
}

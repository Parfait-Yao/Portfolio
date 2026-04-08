"use client"
import { motion } from "framer-motion"
import { ExternalLink, ArrowUpRight } from "lucide-react"
import { FaGithub } from "react-icons/fa6"
import Link from "next/link"
import { useLanguage } from '@/context/LanguageContext'

export default function ProjectCard({ project }: { project: any }) {
  const { t } = useLanguage()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col h-full bg-card border border-border rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-black/10">
            <span className="font-serif text-4xl italic">{t.home.portfolioLabel}</span>
          </div>
        )}
        
        {/* Overlay with links */}
        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
          {project.liveUrl && (
            <Link href={project.liveUrl} target="_blank" className="w-12 h-12 bg-background rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              <ExternalLink size={20} className="text-foreground" />
            </Link>
          )}
          {project.githubUrl && (
            <Link href={project.githubUrl} target="_blank" className="w-12 h-12 bg-background rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              <FaGithub size={20} className="text-foreground" />
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 2).map((tag: string, i: number) => (
            <span key={i} className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/40">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-serif text-foreground leading-tight">
            {project.title}
          </h3>
          <ArrowUpRight size={20} className="text-foreground/20 group-hover:text-foreground transition-colors" />
        </div>

        <p className="text-[14px] text-foreground/60 leading-relaxed font-body line-clamp-2 mb-8">
          {project.description}
        </p>
        
        <div className="mt-auto pt-6 border-t border-border flex items-center gap-6">
          <Link 
            href={`/projects/${project.id}`} 
            className="text-[11px] font-bold uppercase tracking-widest text-foreground hover:opacity-50 transition-opacity"
          >
            {t.home.details}
          </Link>
          {project.featured && (
            <span className="ml-auto text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30">
              {t.home.selected}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

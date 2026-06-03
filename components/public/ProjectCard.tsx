"use client"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { ExternalLink, ArrowUpRight } from "lucide-react"
import { FaGithub } from "react-icons/fa6"
import Link from "next/link"
import { useLanguage } from '@/context/LanguageContext'
import { useRef } from "react"

export default function ProjectCard({ project }: { project: any }) {
  const { t } = useLanguage()
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })
  const glowX   = useTransform(mouseX, [-0.5, 0.5], [0, 100])
  const glowY   = useTransform(mouseY, [-0.5, 0.5], [0, 100])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - left) / width - 0.5)
    mouseY.set((e.clientY - top) / height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col h-full cursor-default"
    >
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "0 0 60px -10px rgba(99,102,241,0.25)" }} />

      {/* Card body */}
      <div className="relative flex flex-col h-full bg-card border border-border rounded-[28px] overflow-hidden transition-all duration-500 group-hover:border-primary/25 group-hover:shadow-[0_32px_80px_-16px_rgba(99,102,241,0.15)] dark:group-hover:shadow-[0_32px_80px_-16px_rgba(99,102,241,0.2)]">

        {/* Holographic glow overlay */}
        <motion.div
          className="absolute inset-0 rounded-[28px] pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(180px circle at ${x}% ${y}%, rgba(99,102,241,0.06), transparent)`
            )
          }}
        />

        {/* Top accent line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

        {/* ── Image ── */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.07]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.1))" }}>
              <span className="font-serif text-5xl italic text-primary/15">{project.title?.[0]}</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Action buttons */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
            <div className="flex gap-2">
              {project.liveUrl && (
                <Link href={project.liveUrl} target="_blank"
                  className="w-9 h-9 bg-card/90 backdrop-blur-md border border-border/60 rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-transparent transition-all duration-200 hover:scale-110 shadow-lg"
                >
                  <ExternalLink size={13} />
                </Link>
              )}
              {project.githubUrl && (
                <Link href={project.githubUrl} target="_blank"
                  className="w-9 h-9 bg-card/90 backdrop-blur-md border border-border/60 rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-transparent transition-all duration-200 hover:scale-110 shadow-lg"
                >
                  <FaGithub size={13} />
                </Link>
              )}
            </div>
            {project.featured && (
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 bg-amber-500/12 border border-amber-500/25 px-2.5 py-1 rounded-full">
                ★ Featured
              </span>
            )}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags?.slice(0, 3).map((tag: string, i: number) => (
              <span key={i} className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-primary/60 bg-primary/6 px-2.5 py-1 rounded-full border border-primary/10">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <div className="flex justify-between items-start mb-3 gap-3">
            <h3 className="text-[17px] font-semibold text-foreground leading-tight">
              {project.title}
            </h3>
            <ArrowUpRight
              size={17}
              className="text-primary/25 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 mt-0.5"
            />
          </div>

          <p className="text-[13px] text-foreground/55 leading-relaxed line-clamp-2 mb-auto">
            {project.description}
          </p>

          {/* Footer */}
          <div className="mt-5 pt-5 border-t border-border flex items-center">
            <Link
              href={`/projects/${project.id}`}
              className="text-[10px] font-extrabold uppercase tracking-widest text-primary/50 hover:text-primary transition-colors flex items-center gap-1"
            >
              {t.home.details}
              <ArrowUpRight size={11} />
            </Link>
            {project.likes !== undefined && project.likes > 0 && (
              <span className="ml-auto text-[11px] text-foreground/30 font-medium flex items-center gap-1">
                ♥ {project.likes}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

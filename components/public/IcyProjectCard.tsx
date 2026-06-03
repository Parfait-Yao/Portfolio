"use client"
import React, { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { Heart, ExternalLink, ArrowUpRight } from "lucide-react"
import { FaGithub } from "react-icons/fa6"
import { cn } from "@/lib/utils"

const fallback = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop",
]

interface Props {
  project: any
  index?: number
  featured?: boolean /* spans 2 columns when true */
}

export default function IcyProjectCard({ project, index = 0, featured = false }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [likes,    setLikes]    = useState(project.likes || 0)
  const [hasLiked, setHasLiked] = useState(false)
  const [hovered,  setHovered]  = useState(false)

  /* subtle tilt */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), { stiffness: 300, damping: 30 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), { stiffness: 300, damping: 30 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    mx.set((e.clientX - left) / width  - 0.5)
    my.set((e.clientY - top)  / height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0); setHovered(false) }

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation()
    if (hasLiked) return
    setLikes((n: number) => n + 1); setHasLiked(true)
    try { await fetch(`/api/projects/${project.id}/like`, { method: "PATCH" }) }
    catch { setLikes((n: number) => n - 1); setHasLiked(false) }
  }

  const image = project.imageUrl || fallback[index % fallback.length]
  const tags  = (project.tags || []).slice(0, 3)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1600, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      className={cn("group relative cursor-default", featured && "md:col-span-2")}
    >
      {/* ── Card ── */}
      <div className={cn(
        "relative overflow-hidden rounded-2xl bg-foreground",
        featured ? "aspect-[16/7]" : "aspect-[4/5]"
      )}>

        {/* ── Full-bleed image ── */}
        <motion.img
          src={image}
          alt={project.title}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* ── Gradient scrim — always visible from bottom ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* ── Hover: darker centre vignette ── */}
        <div className={cn(
          "absolute inset-0 bg-black/20 transition-opacity duration-700",
          hovered ? "opacity-100" : "opacity-0"
        )} />

        {/* ══ TOP ROW ══ */}
        <div className="absolute top-5 left-5 right-5 flex items-start justify-between z-20">

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/15 rounded-full text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/80">
                {tag}
              </span>
            ))}
          </div>

          {/* Featured badge */}
          {project.featured && (
            <span className="px-3 py-1 bg-amber-400/15 backdrop-blur-md border border-amber-400/30 rounded-full text-[9px] font-extrabold uppercase tracking-widest text-amber-300">
              ★ Sélectionné
            </span>
          )}
        </div>

        {/* ══ BOTTOM CONTENT — slides up on hover ══ */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-7">

          {/* Index number — editorial touch */}
          <div className={cn(
            "text-white/20 font-clash text-[11px] font-bold tracking-[0.3em] uppercase mb-3 transition-all duration-500",
            hovered ? "opacity-0 -translate-y-1" : "opacity-100"
          )}>
            {String(index + 1).padStart(2, "0")} /
          </div>

          {/* Title */}
          <h3 className={cn(
            "font-serif text-white leading-[1.05] tracking-tight transition-all duration-500",
            featured ? "text-[clamp(24px,4vw,42px)]" : "text-[clamp(20px,2.5vw,28px)]"
          )}>
            {project.title}
          </h3>

          {/* Description — appears on hover */}
          <motion.p
            initial={false}
            animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/55 text-[13px] leading-relaxed mt-2 overflow-hidden max-w-md"
          >
            {project.description}
          </motion.p>

          {/* ── Divider + actions ── */}
          <div className={cn(
            "flex items-center justify-between mt-5 pt-4 border-t border-white/10 transition-all duration-500",
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}>
            {/* Left: like */}
            <button
              onClick={handleLike}
              className={cn(
                "flex items-center gap-2 text-[11px] font-bold transition-all duration-200",
                hasLiked ? "text-red-400" : "text-white/40 hover:text-white/70"
              )}
            >
              <Heart size={13} className={cn(hasLiked && "fill-current")} />
              <span>{likes}</span>
            </button>

            {/* Right: action buttons */}
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all hover:scale-110"
                >
                  <FaGithub size={13} />
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all hover:scale-110"
                >
                  <ExternalLink size={13} />
                </a>
              )}
              <Link
                href={`/projects/${project.id}`}
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest hover:bg-white/90 transition-all hover:scale-[1.03] active:scale-95 shadow-lg"
              >
                Voir
                <ArrowUpRight size={11} />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Arrow peek (top-right) — visible without hover ── */}
        <div className={cn(
          "absolute top-5 right-5 w-10 h-10 rounded-full bg-white/8 backdrop-blur-md border border-white/12 flex items-center justify-center text-white/50 transition-all duration-400",
          hovered ? "opacity-0 scale-90" : "opacity-100 scale-100",
          project.featured && "hidden" // hide when featured badge is shown
        )}>
          <ArrowUpRight size={16} />
        </div>
      </div>
    </motion.div>
  )
}

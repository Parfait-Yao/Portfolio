"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, MapPin, Calendar, Briefcase, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ExperienceCard({ experience, index = 0 }: { experience: any; index?: number }) {
  const [likes, setLikes]       = useState(experience.likes || 0)
  const [hasLiked, setHasLiked] = useState(false)

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (hasLiked) return
    setLikes(likes + 1)
    setHasLiked(true)
    try {
      await fetch(`/api/experience/${experience.id}/like`, { method: "PATCH" })
    } catch {
      setLikes(likes)
      setHasLiked(false)
    }
  }

  const startDate = new Date(experience.startDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
  const endDate   = experience.current
    ? "Présent"
    : experience.endDate
      ? new Date(experience.endDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
      : ""

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-14"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-6 flex flex-col items-center">
        <div className={cn(
          "w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300 z-10 relative overflow-hidden",
          experience.current
            ? "bg-emerald-500/8 dark:bg-emerald-500/10 border-emerald-500/30 dark:border-emerald-500/40"
            : "bg-card border-border hover:border-primary/25"
        )}
        >
          {experience.imageUrl ? (
            <img src={experience.imageUrl} alt={experience.company} className="w-full h-full object-cover rounded-[10px]" />
          ) : (
            <Briefcase size={16} className={experience.current ? "text-emerald-500" : "text-primary/40"} />
          )}
          {experience.current && (
            <div className="absolute inset-0 rounded-xl bg-emerald-500/10 animate-pulse-glow" />
          )}
        </div>
      </div>

      {/* Card */}
      <div className="group relative bg-card border border-border rounded-[24px] p-6 hover:border-primary/20 transition-all duration-400 hover:shadow-[0_16px_60px_-12px_rgba(99,102,241,0.12)] dark:hover:shadow-[0_16px_60px_-12px_rgba(99,102,241,0.2)] overflow-hidden">

        {/* Top accent glow */}
        <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-[17px] font-bold text-foreground leading-tight">
                {experience.role}
              </h3>
              {experience.current && (
                <span className="flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  Actuel
                </span>
              )}
            </div>
            <p className="text-[13px] font-bold text-primary/60 uppercase tracking-wider">{experience.company}</p>
          </div>

          {/* Meta pills */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-foreground/50 shrink-0">
            <div className="flex items-center gap-1.5 bg-primary/5 border border-primary/10 px-3 py-1.5 rounded-full">
              <Calendar size={11} className="text-primary/60" />
              <span>{startDate} — {endDate}</span>
            </div>
            {experience.location && (
              <div className="flex items-center gap-1.5 bg-primary/5 border border-primary/10 px-3 py-1.5 rounded-full">
                <MapPin size={11} className="text-primary/60" />
                <span>{experience.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Description ── */}
        <p className="text-[13px] text-foreground/60 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300 mb-5">
          {experience.description}
        </p>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between pt-4 border-t border-border/60">
          <button
            onClick={handleLike}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold transition-all duration-200",
              hasLiked
                ? "bg-rose-500/10 text-rose-500 border border-rose-500/25"
                : "bg-primary/5 text-foreground/40 border border-primary/10 hover:text-foreground/60 hover:border-primary/20 hover:bg-primary/8"
            )}
          >
            <Heart size={12} className={hasLiked ? "fill-current" : ""} />
            <span>{likes}</span>
          </button>

          <Link
            href={`/experience/${experience.id}`}
            className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors"
          >
            Voir détail <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

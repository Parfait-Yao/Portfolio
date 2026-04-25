"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, MapPin, Calendar, Briefcase, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ExperienceCard({ experience }: { experience: any }) {
  const [likes, setLikes] = useState(experience.likes || 0)
  const [hasLiked, setHasLiked] = useState(false)

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (hasLiked) return
    setLikes(likes + 1)
    setHasLiked(true)
    try {
      await fetch(`/api/experience/${experience.id}/like`, { method: "PATCH" })
    } catch (error) {
      setLikes(likes)
      setHasLiked(false)
    }
  }

  const startDate = new Date(experience.startDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
  const endDate = experience.current 
    ? "Présent" 
    : experience.endDate 
      ? new Date(experience.endDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
      : ""

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-card border border-border/50 rounded-[24px] p-5 md:p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-500"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Experience Photo / Icon */}
        <div className="relative shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-muted border border-border flex items-center justify-center">
          {experience.imageUrl ? (
            <img 
              src={experience.imageUrl} 
              alt={experience.company} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <Briefcase size={32} className="text-muted-foreground/40" />
          )}
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-xl font-display font-bold text-foreground leading-tight mb-1">
                {experience.role}
              </h3>
              <div className="flex items-center gap-2 text-primary font-body text-sm font-bold uppercase tracking-wider">
                <span>{experience.company}</span>
                {experience.current && (
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-[12px] font-medium">
              <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full">
                <Calendar size={14} />
                <span>{startDate} — {endDate}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full">
                <MapPin size={14} />
                <span>{experience.location}</span>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed font-body mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
            {experience.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <button 
              onClick={handleLike}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all",
                hasLiked 
                  ? "bg-red-500/10 text-red-500" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              <Heart size={14} className={hasLiked ? "fill-current" : ""} />
              <span>{likes}</span>
            </button>

            <Link 
              href={`/experience/${experience.id}`}
              className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              En savoir plus <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

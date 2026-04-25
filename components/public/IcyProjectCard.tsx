"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Heart, ExternalLink, ArrowUpRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export default function IcyProjectCard({ project }: { project: any }) {
  const [isHovered, setIsHovered] = useState(false)
  const [likes, setLikes] = useState(project.likes || 0)
  const [hasLiked, setHasLiked] = useState(false)

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (hasLiked) return
    setLikes(likes + 1)
    setHasLiked(true)
    try {
      await fetch(`/api/projects/${project.id}/like`, { method: "PATCH" })
    } catch (error) {
      setLikes(likes)
      setHasLiked(false)
    }
  }

  const tags = project.tags || []
  const defaultImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-[400px] w-full perspective-1000"
    >
      {/* Glow Effect Background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-[32px] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      
      <div className="relative h-full w-full bg-background/40 backdrop-blur-xl border border-white/20 rounded-[32px] overflow-hidden shadow-2xl flex flex-col transition-all duration-500 group-hover:border-white/40">
        
        {/* Image Container with "Frost" Overlay */}
        <div className="relative h-[50%] w-full overflow-hidden">
          <motion.img
            src={project.imageUrl || defaultImage}
            alt={project.title}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="h-full w-full object-cover"
          />
          
          {/* Icy Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-background/90" />
          
          {/* Shimmer Effect */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Floating Badges (Tags) */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
            {tags.slice(0, 3).map((tag: string, i: number) => (
              <span key={i} className="px-2.5 py-0.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[8px] font-bold uppercase tracking-wider text-white shadow-sm">
                {tag}
              </span>
            ))}
          </div>

          {/* Top Right Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            <button 
              onClick={handleLike}
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border",
                hasLiked 
                  ? "bg-red-500/20 border-red-500/50 text-red-500" 
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              )}
            >
              <Heart size={16} className={hasLiked ? "fill-current" : ""} />
            </button>
            
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                title="View Code"
              >
                <Sparkles size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="relative flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400/80">Stack</span>
              </div>
            </div>
            
            <h3 className="text-xl font-display font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300 truncate">
              {project.title}
            </h3>
            
            <p className="text-muted-foreground text-[13px] line-clamp-2 font-body leading-relaxed mb-3">
              {project.description}
            </p>

            {/* Technologies Grid */}
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 mb-3">
              {tags.slice(0, 3).map((tag: string, i: number) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-primary/40" />
                  <span className="text-[10px] font-medium text-foreground/70">{tag}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
             <div className="flex items-center gap-3">
               <div className="flex items-center gap-1">
                 <span className="text-xs font-bold text-foreground">{likes}</span>
                 <Heart size={10} className="text-red-500 fill-red-500/20" />
               </div>
             </div>

            <div className="flex gap-1.5">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 border border-white/10 rounded-full text-foreground hover:bg-white/10 transition-all"
                >
                  <ExternalLink size={14} />
                </a>
              )}
              <Link 
                href={`/projects/${project.id}`}
                className="group/btn relative px-4 py-2 bg-foreground text-background rounded-full font-bold text-[10px] uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span className="relative z-10">Détails</span>
                <ArrowUpRight size={12} className="relative z-10" />
                <motion.div 
                  className="absolute inset-0 bg-primary"
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Frosty Border Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  )
}

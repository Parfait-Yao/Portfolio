"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, Navigation } from "lucide-react"

export default function ModernProjectCard({ project }: { project: any }) {
  const [likes, setLikes] = useState(project.likes || 0)
  const [isLiking, setIsLiking] = useState(false)
  const [hasLiked, setHasLiked] = useState(false)

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (isLiking || hasLiked) return
    
    setIsLiking(true)
    setLikes(likes + 1)
    setHasLiked(true)

    try {
      await fetch(`/api/projects/${project.id}/like`, {
        method: "PATCH",
      })
    } catch (error) {
      console.error("Failed to like project:", error)
      setLikes(likes) // Revert optimistic update
      setHasLiked(false)
    } finally {
      setIsLiking(false)
    }
  }

  // Fallback data if needed
  const primaryTag = project.tags && project.tags.length > 0 ? project.tags[0] : "Project"
  const tag1 = project.tags && project.tags[1] ? project.tags[1] : "Frontend"
  const tag2 = project.tags && project.tags[2] ? project.tags[2] : "Backend"
  
  // Format dates or status
  const status = project.featured ? "Selected" : "En ligne"
  const dateStr = project.createdAt ? new Date(project.createdAt).getFullYear() : "2024"

  const defaultImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop"

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-[32px] p-2 md:p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full"
    >
      {/* Top Image Section */}
      <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden group">
        <img 
          src={project.imageUrl || defaultImage} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
        
        {/* Inside Overlay Contents */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex justify-between items-end gap-4">
          <div className="flex-1 min-w-0 text-left">
            <h3 className="text-white font-medium text-xl md:text-2xl truncate mb-1 text-shadow-sm">
              {project.title}
            </h3>
            <p className="text-white/70 text-sm font-medium tracking-wide">
              {primaryTag}
            </p>
          </div>
          
          <Link 
            href={`/projects/${project.id}`}
            className="flex-shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/10 text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2"
          >
            Détails
          </Link>
        </div>
      </div>

      {/* Bottom Information Section */}
      <div className="p-4 md:p-6 pt-5 flex flex-col flex-grow text-left">
        <div className="flex flex-col gap-1 mb-5">
           <span className="font-bold text-[#0A0A0A] text-lg uppercase tracking-wide">
             {status}
           </span>
           <span className="text-[#888888] text-[13px] font-medium">
             Créé par Parfait Eric • {dateStr}
           </span>
        </div>

        {/* Divider */}
        <hr className="border-t border-black/5 mb-6" />

        <div className="flex items-center justify-between mt-auto">
          {/* Stats/Tags mimicking the mock */}
          <div className="flex items-center gap-6 md:gap-8">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-[#0A0A0A] text-base">{primaryTag}</span>
              <span className="text-[#888888] text-[11px] uppercase tracking-wider font-bold">Stack</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-[#0A0A0A] text-base">{tag1}</span>
              <span className="text-[#888888] text-[11px] uppercase tracking-wider font-bold">Outil</span>
            </div>
            <div className="hidden sm:flex flex-col gap-1">
              <span className="font-bold text-[#0A0A0A] text-base">{tag2}</span>
              <span className="text-[#888888] text-[11px] uppercase tracking-wider font-bold">Focus</span>
            </div>
          </div>

          {/* Action Box: Like Button */}
          <button 
            onClick={handleLike}
            disabled={isLiking}
            className="w-14 h-14 md:w-16 md:h-16 flex flex-col items-center justify-center gap-1 rounded-2xl bg-[#F7F7F5] border border-black/5 hover:bg-[#EFEFEB] transition-colors flex-shrink-0"
            title="Liker ce projet"
          >
            <motion.div
              whileTap={{ scale: 0.8 }}
              animate={hasLiked ? { scale: [1, 1.2, 1] } : {}}
            >
              <Heart 
                size={22} 
                className={hasLiked ? "fill-red-500 text-red-500" : "text-[#4A4A4A]"} 
                strokeWidth={hasLiked ? 1 : 2}
              />
            </motion.div>
            <span className="text-[10px] font-bold text-[#4A4A4A] font-mono">{likes}</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

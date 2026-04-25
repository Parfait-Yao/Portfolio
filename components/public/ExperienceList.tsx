"use client"
import React, { useState } from "react"
import ExperienceCard from "./ExperienceCard"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function ExperienceList({ experiences }: { experiences: any[] }) {
  const [visibleCount, setVisibleCount] = useState(3)

  const showMore = () => {
    setVisibleCount(prev => prev + 3)
  }

  const visibleExperiences = experiences.slice(0, visibleCount)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {visibleExperiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </AnimatePresence>
      </div>

      {experiences.length > visibleCount && (
        <div className="mt-12 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={showMore}
            className="flex items-center gap-2 px-8 py-3 bg-card border border-border rounded-full text-sm font-bold uppercase tracking-widest text-foreground hover:bg-muted transition-all shadow-sm"
          >
            Afficher plus d'expériences
            <ChevronDown size={18} />
          </motion.button>
        </div>
      )}
    </div>
  )
}

"use client"
import React, { useState } from "react"
import ExperienceCard from "./ExperienceCard"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function ExperienceList({ experiences }: { experiences: any[] }) {
  const [visibleCount, setVisibleCount] = useState(4)

  return (
    <div>
      {/* Timeline line */}
      <div className="relative">
        <div className="timeline-line" />
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {experiences.slice(0, visibleCount).map((exp, i) => (
              <ExperienceCard key={exp.id} experience={exp} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {experiences.length > visibleCount && (
        <div className="mt-10 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setVisibleCount(v => v + 4)}
            className="flex items-center gap-2 px-7 py-3 bg-card border border-border rounded-full text-[11px] font-extrabold uppercase tracking-widest text-foreground/50 hover:text-primary hover:border-primary/30 transition-all shadow-sm dark:shadow-none"
          >
            Voir plus <ChevronDown size={15} />
          </motion.button>
        </div>
      )}
    </div>
  )
}

"use client"

import React, { useState } from 'react'
import ModernProjectCard from './ModernProjectCard'

export default function ProjectList({ initialProjects }: { initialProjects: any[] }) {
  const [visibleCount, setVisibleCount] = useState(3)

  const showMore = () => {
    setVisibleCount(prev => prev + 3)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {initialProjects.slice(0, visibleCount).map((project) => (
          <ModernProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      {initialProjects.length > visibleCount && (
        <div className="mt-16 flex justify-center">
          <button 
            onClick={showMore}
            className="bg-white border border-[#E8E8E4] text-[#0A0A0A] hover:bg-[#F7F7F5] transition-colors px-8 py-3.5 rounded-full font-jakarta font-medium text-[15px] shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95"
          >
            Voir plus de projets
          </button>
        </div>
      )}
    </>
  )
}

"use client"
import React, { useRef } from "react"
import { 
  Zap, 
  Atom, 
  Code2, 
  Server, 
  Database, 
  Wind, 
  Box, 
  GitBranch, 
  Image,
  Layers
} from "lucide-react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"

const getIcon = (name: string) => {
  const icons: Record<string, any> = {
    'Next.js': Zap,
    'React': Atom,
    'TypeScript': Code2,
    'Node.js': Server,
    'Prisma': Database,
    'Tailwind': Wind,
    'PostgreSQL': Database,
    'Three.js': Box,
    'Git': GitBranch,
    'Cloudinary': Image,
  }
  return icons[name] || Layers
}

interface TechCellProps {
  name: string
  label: string
}

export default function TechCell({ name, label }: TechCellProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const Icon = getIcon(name)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { left, top } = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  const background = useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, rgba(0,0,0,0.06), transparent 80%)`

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative flex items-center gap-4 px-8 py-5 group cursor-default transition-all duration-500 bg-card border border-border rounded-full hover:border-primary/20 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden"
    >
      {/* Spotlight effect for the cell */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background }}
      />

      {/* Icon */}
      <div className="relative z-10 text-foreground/40 group-hover:text-foreground transition-colors duration-500">
        <Icon size={24} strokeWidth={1.5} />
      </div>

      {/* Text Info */}
      <div className="relative z-10 flex flex-col min-w-[100px]">
        <span className="text-foreground font-jakarta text-[13px] font-extrabold uppercase tracking-widest leading-none mb-1">
          {name}
        </span>
        <span className="text-foreground/30 font-jakarta text-[11px] font-medium group-hover:text-foreground/50 transition-colors duration-500">
          {label}
        </span>
      </div>
    </div>
  )
}

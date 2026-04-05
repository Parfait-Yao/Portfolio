'use client'
import React from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Briefcase, Code, User, MessageSquare } from "lucide-react"

const navLinks = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Projets", href: "/projects", icon: Code },
  { name: "Expériences", href: "/experience", icon: Briefcase },
  { name: "Skills", href: "/skills", icon: User },
  { name: "Contact", href: "/contact", icon: MessageSquare },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300">
      <div className="glass-pill p-1.5 flex items-center gap-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href
          const Icon = link.icon
          
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={`relative flex flex-col items-center justify-center min-w-[64px] h-14 rounded-2xl transition-colors duration-300 ${
                isActive ? 'text-primary' : 'text-foreground/40 hover:text-foreground/70'
              }`}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    layoutId="bottom-nav-active"
                    className="absolute inset-0 bg-primary/10 rounded-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  />
                )}
              </AnimatePresence>
              
              <Icon 
                size={20} 
                className="relative z-10 mb-1" 
                strokeWidth={isActive ? 2.5 : 2}
              />
              
              <span className="relative z-10 text-[9px] font-bold uppercase tracking-wider">
                {link.name}
              </span>
              
              <span className="sr-only">{link.name}</span>
            </Link>

          )
        })}
      </div>
    </nav>
  )
}


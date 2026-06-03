'use client'
import React from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Briefcase, Code2, Layers, MessageSquare } from "lucide-react"
import { useLanguage } from '@/context/LanguageContext'

export default function BottomNav() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const navLinks = [
    { name: t.nav.home,       href: "/",           icon: Home },
    { name: t.nav.projects,   href: "/projects",   icon: Code2 },
    { name: t.nav.experience, href: "/experience", icon: Briefcase },
    { name: t.nav.skills,     href: "/skills",     icon: Layers },
    { name: t.nav.contact,    href: "/contact",    icon: MessageSquare },
  ]

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]">
      <div className="bottom-nav-bar p-1.5 flex items-center gap-0.5">
        {navLinks.map((link) => {
          const isActive = pathname === link.href
          const Icon = link.icon

          return (
            <Link
              key={link.name}
              href={link.href}
              className="relative flex flex-col items-center justify-center w-[58px] h-[54px] rounded-[22px] transition-colors duration-200"
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="bottom-pill"
                    className="absolute inset-0 rounded-[22px] bg-gradient-primary"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </AnimatePresence>

              <Icon
                size={19}
                className={`relative z-10 mb-0.5 transition-all duration-200 ${
                  isActive ? 'text-white' : 'text-foreground/40'
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />

              <span className={`relative z-10 text-[8px] font-bold uppercase tracking-wide transition-colors duration-200 ${
                isActive ? 'text-white/90' : 'text-foreground/35'
              }`}>
                {link.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

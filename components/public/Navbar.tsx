'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { useLanguage } from '@/context/LanguageContext'
import { Globe, Lock } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()

  const navLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.projects, href: "/projects" },
    { name: t.nav.experience, href: "/experience" },
    { name: t.nav.skills, href: "/skills" },
  ]

  return (
    <header className="glass-nav transition-colors duration-300">
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 h-[68px] flex items-center gap-4">

        {/* ── Brand ── */}
        <div className="flex-1">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:rounded-2xl shimmer bg-gradient-primary">
              <span className="absolute inset-0 flex items-center justify-center text-white font-clash font-bold text-base z-10">P</span>
            </div>
            <div className="hidden sm:flex flex-col leading-none gap-0.5">
              <span className="font-clash font-bold text-[14px] tracking-tight text-foreground">Parfait</span>
              <span className="font-serif italic text-[10px] text-primary/60 leading-none">Eric Yao</span>
            </div>
          </Link>
        </div>

        {/* ── Nav pill ── */}
        <nav className="hidden lg:flex items-center gap-0.5 px-1.5 py-1.5 rounded-full border border-border bg-muted/60 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full font-jakarta text-[11px] font-extrabold uppercase tracking-[0.15em] transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-foreground/50 hover:text-foreground/80'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full shadow-sm bg-gradient-primary"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* ── Actions ── */}
        <div className="flex-1 flex justify-end items-center gap-2">
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="group flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-foreground/40 hover:text-primary transition-colors duration-200 px-3 py-2 rounded-full hover:bg-primary/8"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'fr' ? 'FR' : 'EN'}</span>
          </button>

          <ThemeToggle />

          <Link
            href="/admin"
            className="p-2 text-foreground/30 hover:text-primary transition-all duration-200 hover:scale-110 rounded-full hover:bg-primary/8"
            title="Admin"
          >
            <Lock className="w-3.5 h-3.5" />
          </Link>

          <Link href="/contact" className="hidden sm:block">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative overflow-hidden px-5 py-2 rounded-full text-[11px] font-extrabold uppercase tracking-widest shadow-lg cursor-pointer shimmer text-white bg-gradient-primary"
            >
              {t.nav.contact}
            </motion.div>
          </Link>
        </div>
      </div>
    </header>
  )
}

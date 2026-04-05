'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/Button"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "Projets", href: "/projects" },
  { name: "Expériences", href: "/experience" },
  { name: "Skills", href: "/skills" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="glass-nav fixed top-0 left-0 right-0 w-full z-[100] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center">
        
        {/* Left: Brand */}
        <div className="flex-1">
          <Link href="/" className="font-serif text-xl tracking-tighter text-foreground hover:opacity-70 transition-opacity flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-sm font-bold">
              P
            </div>
            <span className="hidden sm:inline-block">Parfait <span className="opacity-40 italic">Eric</span></span>
          </Link>
        </div>
        
        {/* Center: Nav links */}
        <nav className="hidden lg:flex items-center gap-1 px-1.5 py-1.5 bg-pill border border-border/5 rounded-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full font-jakarta text-[11px] font-extrabold uppercase tracking-[0.2em] transition-all hover:text-foreground ${isActive ? 'text-foreground' : 'text-foreground/40'}`}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="nav-pill-active"
                    className="absolute inset-0 bg-background shadow-sm rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <ThemeToggle />
          <Link href="/contact" className="hidden sm:block">
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:opacity-90 border-transparent text-[11px] font-bold uppercase tracking-widest px-6 h-10 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/10">
              Contacter
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}


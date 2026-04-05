import { ReactNode } from "react"
import Navbar from "@/components/public/Navbar"
import BottomNav from "@/components/public/BottomNav"
import Link from "next/link"
import { Instrument_Serif, Plus_Jakarta_Sans } from 'next/font/google'

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-display',
})

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
})

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${instrumentSerif.variable} ${jakartaSans.variable} min-h-screen bg-background flex flex-col font-body selection:bg-primary selection:text-primary-foreground`}>
      <Navbar />
      <main className="flex-grow pb-20 md:pb-0">
        {children}
      </main>
      <BottomNav />
      <footer className="hidden md:flex py-16 px-6 max-w-6xl mx-auto w-full border-t border-border/50 justify-between items-start bg-transparent">
        <div className="flex flex-col gap-4">
          <Link href="/" className="font-serif text-2xl tracking-tighter text-foreground">
            Parfait Eric
          </Link>
          <div className="text-muted-foreground text-[13px] font-medium tracking-wide">
             © {new Date().getFullYear()} Parfait Eric Yao. <br />
             Conçu avec précision par le code.
          </div>
        </div>
        <div className="flex flex-col gap-4 items-end">
          <div className="flex gap-8 text-[12px] font-bold text-[#888888] uppercase tracking-[0.1em]">
            <Link href="/about" className="hover:text-[#0A0A0A] transition-colors">About</Link>
            <Link href="/projects" className="hover:text-[#0A0A0A] transition-colors">Projects</Link>
            <Link href="/contact" className="hover:text-[#0A0A0A] transition-colors">Contact</Link>
          </div>
          <div className="text-[12px] text-muted-foreground">
            Basé à Abidjan, Côte d'Ivoire.
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Briefcase, History, Code2, UserCircle, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

const adminNavItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Stats" },
  { href: "/admin/projects", icon: Briefcase, label: "Projets" },
  { href: "/admin/experience", icon: History, label: "Exp." },
  { href: "/admin/skills", icon: Code2, label: "Skills" },
  { href: "/admin/about", icon: UserCircle, label: "Profil" },
  { href: "/admin/messages", icon: Mail, label: "Messages" },
]

export default function AdminBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border pb-safe">
      <div className="flex items-stretch justify-around h-16">
        {adminNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 transition-all duration-300",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon 
                size={20} 
                strokeWidth={isActive ? 2.5 : 1.5}
                className={cn("mb-1 transition-transform", isActive && "scale-110")}
              />
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest",
                isActive ? "opacity-100" : "opacity-0"
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

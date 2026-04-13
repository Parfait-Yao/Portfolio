"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Briefcase, 
  History, 
  GraduationCap, 
  Code2, 
  UserCircle, 
  Mail, 
  LogOut,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"

const adminNavItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Vue d'ensemble" },
  { href: "/admin/projects",  icon: Briefcase,       label: "Projets" },
  { href: "/admin/experience", icon: History,         label: "Expériences" },
  { href: "/admin/skills",     icon: Code2,           label: "Compétences" },
  { href: "/admin/about",      icon: UserCircle,      label: "Profil" },
  { href: "/admin/messages",   icon: Mail,            label: "Messages" },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[280px] fixed inset-y-0 left-0 bg-card border-r border-border flex flex-col z-50">
      {/* Brand Section */}
      <div className="h-[100px] flex items-center px-10 border-b border-border">
        <Link href="/admin/dashboard" className="group">
          <span className="font-display text-2xl tracking-tighter text-foreground">
            Scribbit<span className="text-muted-foreground">Admin</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-10 px-6 space-y-2">
        <p className="font-body text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6 px-4">Navigation principale</p>
        {adminNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 font-body text-[14px]",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-[#6B6B6B] hover:bg-muted hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                <span className={cn(isActive ? "font-bold" : "font-medium")}>{item.label}</span>
              </div>
              
              {isActive && <ChevronRight size={14} className="opacity-50" />}
            </Link>
          )
        })}
      </nav>

      {/* User & Logout */}
      <div className="p-8 border-t border-border bg-muted/50">
        <div className="flex items-center gap-4 mb-6 px-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-display text-lg">
            E
          </div>
          <div className="flex flex-col truncate">
            <span className="font-body text-[14px] font-bold text-foreground truncate">Parfait Eric</span>
            <span className="font-body text-[11px] text-muted-foreground truncate uppercase tracking-widest">Administrateur</span>
          </div>
        </div>
        
        <button 
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-2 px-4 py-3 text-[13px] text-muted-foreground hover:text-foreground hover:bg-card border border-transparent hover:border-border rounded-xl transition-all font-body font-bold uppercase tracking-widest"
        >
          <LogOut size={14} />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}

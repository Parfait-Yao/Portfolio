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
    <aside className="w-[280px] fixed inset-y-0 left-0 bg-white border-r border-[#E8E8E4] flex flex-col z-50">
      {/* Brand Section */}
      <div className="h-[100px] flex items-center px-10 border-b border-[#E8E8E4]">
        <Link href="/admin/dashboard" className="group">
          <span className="font-display text-2xl tracking-tighter text-[#0A0A0A]">
            Scribbit<span className="text-[#888888]">Admin</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-10 px-6 space-y-2">
        <p className="font-body text-[11px] font-bold text-[#888888] uppercase tracking-[0.2em] mb-6 px-4">Navigation principale</p>
        {adminNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 font-body text-[14px]",
                isActive 
                  ? "bg-[#0A0A0A] text-white" 
                  : "text-[#6B6B6B] hover:bg-[#F7F7F5] hover:text-[#0A0A0A]"
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
      <div className="p-8 border-t border-[#E8E8E4] bg-[#F7F7F5]/50">
        <div className="flex items-center gap-4 mb-6 px-2">
          <div className="w-10 h-10 bg-[#0A0A0A] rounded-full flex items-center justify-center text-white font-display text-lg">
            E
          </div>
          <div className="flex flex-col truncate">
            <span className="font-body text-[14px] font-bold text-[#0A0A0A] truncate">Parfait Eric</span>
            <span className="font-body text-[11px] text-[#888888] truncate uppercase tracking-widest">Administrateur</span>
          </div>
        </div>
        
        <button 
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-2 px-4 py-3 text-[13px] text-[#888888] hover:text-[#0A0A0A] hover:bg-white border border-transparent hover:border-[#E8E8E4] rounded-xl transition-all font-body font-bold uppercase tracking-widest"
        >
          <LogOut size={14} />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}

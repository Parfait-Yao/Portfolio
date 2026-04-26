import React from "react"
import { 
  Users, 
  MessageSquare, 
  Briefcase, 
  Code2, 
  TrendingUp, 
  Clock,
  AlertTriangle
} from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  let stats = {
    messages: 0,
    unreadMessages: 0,
    projects: 0,
    experiences: 0,
    skills: 0
  }

  let recentMessages: any[] = []
  let error: string | null = null

  try {
    const { prisma } = await import("@/lib/prisma")
    
    const [messagesCount, unreadCount, projectsCount, expCount, skillsCount, messages] = await Promise.all([
      prisma.message.count(),
      prisma.message.count({ where: { read: false } }),
      prisma.project.count(),
      prisma.experience.count(),
      prisma.skill.count(),
      prisma.message.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
      })
    ])

    stats = {
      messages: messagesCount,
      unreadMessages: unreadCount,
      projects: projectsCount,
      experiences: expCount,
      skills: skillsCount
    }
    recentMessages = messages
  } catch (e: any) {
    console.error("Dashboard data fetch failed:", e.message)
    error = e.message
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Bienvenue dans votre espace d'administration.</p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 p-6 rounded-2xl flex items-center gap-4 text-destructive">
          <AlertTriangle size={24} />
          <div>
            <p className="font-bold">Erreur de base de données</p>
            <p className="text-sm opacity-80">{error}</p>
            <p className="text-xs mt-2 italic">Astuce: Vérifiez que DATABASE_URL est activée pour les environnements 'Preview' sur Vercel.</p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Messages", value: stats.messages, icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Non lus", value: stats.unreadMessages, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "Projets", value: stats.projects, icon: Code2, color: "text-purple-500", bg: "bg-purple-500/10" },
          { label: "Expériences", value: stats.experiences, icon: Briefcase, color: "text-emerald-500", bg: "bg-emerald-500/10" }
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border p-8 rounded-3xl">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
              <stat.icon size={24} />
            </div>
            <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">{stat.label}</p>
            <p className="text-4xl font-display font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-[32px] overflow-hidden">
        <div className="p-8 border-b border-border flex justify-between items-center">
          <h2 className="text-xl font-bold">Messages Récents</h2>
        </div>
        <div className="divide-y divide-border">
          {recentMessages.map((msg) => (
            <div key={msg.id} className="p-8 hover:bg-muted/50 transition-colors flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">{msg.name}</p>
                <p className="text-sm text-muted-foreground">{msg.email} • {new Date(msg.createdAt).toLocaleDateString()}</p>
                <p className="mt-2 text-foreground/80 line-clamp-1">{msg.subject}</p>
              </div>
              {!msg.read && <span className="w-3 h-3 bg-primary rounded-full" />}
            </div>
          ))}
          {recentMessages.length === 0 && !error && (
            <div className="p-20 text-center text-muted-foreground italic">
              Aucun message pour le moment.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

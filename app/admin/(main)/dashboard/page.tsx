import React from "react"
import { 
  Users, 
  Briefcase, 
  Code2, 
  MessageSquare, 
  GraduationCap,
  TrendingUp,
  Clock,
  ExternalLink
} from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  // Imports dynamiques pour éviter les erreurs au build
  const { prisma } = await import("@/lib/prisma")

  const [
    experienceCount,
    projectCount,
    skillCount,
    messageCount,
    educationCount,
    recentMessages
  ] = await Promise.all([
    prisma.experience.count(),
    prisma.project.count(),
    prisma.skill.count(),
    prisma.message.count(),
    prisma.education.count(),
    prisma.message.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    })
  ])

  const stats = [
    { label: "Expériences", value: experienceCount, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Projets", value: projectCount, icon: Code2, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Compétences", value: skillCount, icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Messages", value: messageCount, icon: MessageSquare, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Éducation", value: educationCount, icon: GraduationCap, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Bienvenue dans votre espace d'administration.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all border-border/50">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Messages Récents */}
        <div className="rounded-xl border bg-card shadow-sm border-border/50 overflow-hidden">
          <div className="p-6 border-b border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="text-muted-foreground" />
              <h2 className="font-semibold">Messages Récents</h2>
            </div>
            <button className="text-xs text-primary hover:underline flex items-center gap-1">
              Voir tout <ExternalLink size={12} />
            </button>
          </div>
          <div className="divide-y divide-border/50">
            {recentMessages.length > 0 ? (
              recentMessages.map((msg) => (
                <div key={msg.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-sm">{msg.name}</p>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock size={10} />
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{msg.subject}</p>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-sm text-muted-foreground">
                Aucun message reçu pour le moment.
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions / Status */}
        <div className="rounded-xl border bg-card shadow-sm border-border/50 p-6 space-y-6">
          <h2 className="font-semibold flex items-center gap-2">
            <Clock size={18} className="text-muted-foreground" />
            Statut du Portfolio
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium">Site Public</span>
              </div>
              <span className="text-xs font-bold text-green-500 uppercase">Online</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium">Base de données</span>
              </div>
              <span className="text-xs font-bold text-green-500 uppercase">Connected</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm font-medium">API Cloudinary</span>
              </div>
              <span className="text-xs font-bold text-blue-500 uppercase">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

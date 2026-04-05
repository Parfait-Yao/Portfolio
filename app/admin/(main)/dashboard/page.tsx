import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { 
  Briefcase, 
  Code2, 
  Mail, 
  MessageSquare,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Clock
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default async function DashboardPage() {
  const session = await auth()
  
  // Fetch real data from Prisma
  const [
    projectsCount, 
    skillsCount, 
    messagesCount,
    unreadMessagesCount,
    recentProjects,
    recentMessages
  ] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.message.count(),
    prisma.message.count({ where: { read: false } }),
    prisma.project.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
    prisma.message.findMany({ take: 5, orderBy: { createdAt: 'desc' } })
  ])

  const stats = [
    { title: "Projets réalisés", value: projectsCount, icon: Briefcase },
    { title: "Compétences", value: skillsCount, icon: Code2 },
    { title: "Messages total", value: messagesCount, icon: Mail },
    { title: "Non lus", value: unreadMessagesCount, icon: MessageSquare, highlight: unreadMessagesCount > 0 },
  ]

  return (
    <div className="space-y-12">
      {/* Welcome Header */}
      <section>
        <span className="inline-flex items-center gap-1.5 bg-[#EFEFEB] text-[#3D3D3A] px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase mb-4">
          Tableau de bord
        </span>
        <h1 className="font-display text-[clamp(32px,5vw,48px)] leading-[1.1] text-[#0A0A0A]">
          Ravi de vous revoir, <span className="text-[#888888]">Directeur.</span>
        </h1>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#F7F7F5] rounded-2xl border border-[#E8E8E4] p-8 hover:border-[#D0D0CB] transition-colors group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 bg-white rounded-xl border border-[#E8E8E4] flex items-center justify-center text-[#0A0A0A]">
                <stat.icon size={18} strokeWidth={1.5} />
              </div>
              {stat.highlight && (
                <span className="w-2 h-2 bg-[#0A0A0A] rounded-full animate-pulse"></span>
              )}
            </div>
            <p className="font-display text-4xl text-[#0A0A0A] mb-1">{stat.value}</p>
            <p className="font-body text-[13px] font-bold text-[#888888] uppercase tracking-widest">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Recent Projects Table */}
        <div className="xl:col-span-8 bg-white rounded-2xl border border-[#E8E8E4] p-8 overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="font-display text-2xl text-[#0A0A0A]">Projets récents</h3>
              <p className="font-body text-[13px] text-[#888888]">Gestion des dernières publications.</p>
            </div>
            <Link href="/admin/projects" className="font-body text-[12px] font-bold text-[#0A0A0A] flex items-center gap-1.5 hover:opacity-60 transition-opacity uppercase tracking-widest">
              Gérer tout <ArrowRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto -mx-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E8E8E4] bg-[#F7F7F5]/50 px-8">
                  <th className="py-4 px-8 font-body text-[11px] font-bold text-[#888888] uppercase tracking-widest">Titre</th>
                  <th className="py-4 px-8 font-body text-[11px] font-bold text-[#888888] uppercase tracking-widest">Stack</th>
                  <th className="py-4 px-8 font-body text-[11px] font-bold text-[#888888] uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E4]">
                {recentProjects.map((project) => (
                  <tr key={project.id} className="group hover:bg-[#F7F7F5] transition-colors">
                    <td className="py-5 px-8 font-body text-[15px] font-bold text-[#0A0A0A]">
                      {project.title}
                      {project.featured && <span className="ml-3 text-[9px] bg-[#0A0A0A] text-white px-1.5 py-0.5 rounded uppercase font-bold tracking-widest">Pub</span>}
                    </td>
                    <td className="py-5 px-8">
                      <div className="flex gap-1.5">
                        {project.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="text-[10px] text-[#888888] font-bold uppercase tracking-widest border border-[#E8E8E4] px-1.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-5 px-8">
                      <Link href={`/projects/${project.id}`} target="_blank" className="text-[#888888] hover:text-[#0A0A0A] transition-colors inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-widest">
                        Aperçu <ExternalLink size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="xl:col-span-4 bg-[#F7F7F5] rounded-2xl border border-[#E8E8E4] p-8">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-display text-2xl text-[#0A0A0A]">Flux messages</h3>
            <Link href="/admin/messages" className="font-body text-[12px] font-bold text-[#888888] hover:text-[#0A0A0A] transition-colors uppercase tracking-widest">Tout</Link>
          </div>

          <div className="space-y-6">
            {recentMessages.length > 0 ? (
              recentMessages.map((msg) => (
                <div key={msg.id} className="relative group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={cn("font-body text-[14px] font-bold", !msg.read ? "text-[#0A0A0A]" : "text-[#888888]")}>{msg.name}</h4>
                    {!msg.read && <span className="w-2 h-2 rounded-full bg-[#0A0A0A]"></span>}
                  </div>
                  <p className="font-body text-[12px] text-[#888888] mb-1 truncate">{msg.subject}</p>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#B0B0B0] font-bold uppercase tracking-widest">
                    <Clock size={10} /> {new Date(msg.createdAt).toLocaleDateString()}
                  </div>
                  <ChevronRight size={14} className="absolute top-1/2 -right-2 -translate-y-1/2 text-[#E8E8E4] group-hover:text-[#0A0A0A] group-hover:translate-x-1 transition-all" />
                  <div className="mt-4 border-b border-[#E8E8E4]"></div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 border border-dashed border-[#E8E8E4] rounded-xl">
                 <p className="font-body text-[14px] text-[#888888]">Boîte vide.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

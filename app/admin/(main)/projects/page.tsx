"use client"
import React, { useEffect, useState } from "react"

export const dynamic = "force-dynamic"
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Star,
  ChevronRight,
  Filter
} from "lucide-react"
import ProjectForm from "@/components/admin/ProjectForm"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/projects")
      if (res.ok) {
        const data = await res.json()
        setProjects(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      toast.error("Erreur lors du chargement des projets")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer définitivement ce projet ?")) return

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Projet supprimé l'archive")
        fetchProjects()
      }
    } catch (error) {
      toast.error("Échec de la suppression")
    }
  }

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-12">
      {/* Header section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-[#EFEFEB] text-foreground/80 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase mb-4">
            Management
          </span>
          <h1 className="font-display text-[clamp(32px,5vw,48px)] leading-[1.1] text-foreground mb-4">
            Gestion du <span className="text-muted-foreground">Portfolio.</span>
          </h1>
          <p className="font-body text-[15px] text-[#6B6B6B] max-w-xl">
            Organisez vos réalisations, mettez en avant vos meilleurs travaux et maintenez votre vitrine technologique à jour.
          </p>
        </div>
        
        <button 
          onClick={() => { setSelectedProject(null); setIsFormOpen(true) }}
          className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-body font-bold text-[13px] uppercase tracking-widest hover:bg-primary/80 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Nouveau Projet
        </button>
      </section>

      {/* Main Content Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Filters bar */}
        <div className="p-6 md:p-8 bg-muted/50 border-b border-border flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Rechercher par titre ou tag..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 h-12 bg-card border border-border rounded-full text-[14px] font-body focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 font-body text-[12px] font-bold text-muted-foreground uppercase tracking-widest">
            <Filter size={14} /> <span className="text-foreground">{filteredProjects.length}</span> Entrées
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-5 px-8 font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Projet</th>
                <th className="py-5 px-8 font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest hidden md:table-cell">Stack technique</th>
                <th className="py-5 px-8 font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Visibility</th>
                <th className="py-5 px-8 font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E4]">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={4} className="px-8 py-10 h-20 bg-muted/30"></td>
                  </tr>
                ))
              ) : filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="group hover:bg-muted transition-colors">
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-10 rounded-lg bg-muted overflow-hidden border border-border shrink-0 grayscale group-hover:grayscale-0 transition-all">
                          {project.imageUrl && <img src={project.imageUrl} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-body text-[15px] font-bold text-foreground">{project.title}</span>
                          <span className="font-body text-[11px] text-muted-foreground uppercase tracking-widest mt-0.5 max-w-[200px] truncate">{project.description}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-8 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag: string, i: number) => (
                          <span key={i} className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest border border-border px-1.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      {project.featured ? (
                        <div className="inline-flex items-center gap-1.5 text-foreground font-bold text-[10px] uppercase tracking-widest bg-card border border-primary px-2 py-1 rounded">
                          <Star size={10} className="fill-[#0A0A0A]" /> Featured
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-muted border border-border rounded">Standard</span>
                      )}
                    </td>
                    <td className="py-6 px-8 text-right">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => { setSelectedProject(project); setIsFormOpen(true) }}
                          className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all"
                          title="Modifier"
                        >
                          <Edit2 size={16} strokeWidth={1.5} />
                        </button>
                        <button 
                          onClick={() => handleDelete(project.id)}
                          className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-red-600 hover:border-red-600 transition-all"
                          title="Supprimer"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                        <a 
                          href={`/projects/${project.id}`} 
                          target="_blank" 
                          className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
                          title="Voir"
                        >
                          <ExternalLink size={16} strokeWidth={1.5} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center font-body text-muted-foreground">
                    Aucune archive trouvée pour la recherche actuelle.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProjectForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        project={selectedProject} 
        onSuccess={fetchProjects}
      />
    </div>
  )
}

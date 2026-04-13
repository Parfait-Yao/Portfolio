"use client"
import React, { useEffect, useState } from "react"
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Code2,
  Filter
} from "lucide-react"
import { toast } from "sonner"
import SkillForm from "@/components/admin/SkillForm"

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchSkills = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/skills")
      const data = await res.json()
      setSkills(Array.isArray(data) ? data : [])
    } catch (error) {
      toast.error("Erreur lors du chargement des compétences")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer définitivement cette compétence ?")) return

    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Compétence supprimée")
        fetchSkills()
      } else {
        toast.error("Échec de la suppression")
      }
    } catch (error) {
      toast.error("Erreur réseau")
    }
  }

  const filteredSkills = skills.filter(skill => {
    const search = searchQuery.toLowerCase()
    return skill.name.toLowerCase().includes(search) || skill.category.toLowerCase().includes(search)
  })

  return (
    <div className="space-y-12">
      {/* Header section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-[#EFEFEB] text-foreground/80 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase mb-4">
            Management
          </span>
          <h1 className="font-display text-[clamp(32px,5vw,48px)] leading-[1.1] text-foreground mb-4">
            Gestion des <span className="text-muted-foreground">Compétences.</span>
          </h1>
          <p className="font-body text-[15px] text-[#6B6B6B] max-w-xl">
            Gérez vos compétences techniques, vos niveaux et organisez-les par catégories.
          </p>
        </div>
        
        <button 
          onClick={() => {
            setSelectedSkill(null)
            setIsFormOpen(true)
          }}
          className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-body font-bold text-[13px] uppercase tracking-widest hover:bg-primary/80 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Nouvelle Compétence
        </button>
      </section>

      <div className="space-y-6">
        {/* Content Table */}
        <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.02)]">
          {/* Filters bar */}
          <div className="p-6 md:p-8 bg-muted/50 border-b border-border flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Chercher une compétence ou catégorie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 h-12 bg-card border border-border rounded-full text-[14px] font-body focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 font-body text-[12px] font-bold text-muted-foreground uppercase tracking-widest">
              <Filter size={14} /> <span className="text-foreground">{filteredSkills.length}</span> Entrées
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-5 px-8 font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest min-w-[250px]">Détails</th>
                  <th className="py-5 px-8 font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest min-w-[200px]">Niveau</th>
                  <th className="py-5 px-8 font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-center">Ordre</th>
                  <th className="py-5 px-8 font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E4]">
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={4} className="px-8 py-6 h-20 bg-muted/30"></td>
                    </tr>
                  ))
                ) : filteredSkills.length > 0 ? (
                  filteredSkills.map((skill) => (
                    <tr key={skill.id} className="group hover:bg-muted transition-colors">
                      <td className="py-4 px-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center shrink-0 text-foreground group-hover:bg-card transition-all">
                             <Code2 size={20} strokeWidth={1.5} />
                          </div>
                          <div>
                            <div className="font-body text-[15px] font-bold text-foreground">
                              {skill.name}
                            </div>
                            <div className="font-body text-[12px] text-muted-foreground uppercase tracking-widest mt-0.5">
                              {skill.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-8">
                        <div className="w-full max-w-[200px] flex items-center gap-3">
                           <div className="h-1.5 w-full bg-[#E8E8E4] rounded-full overflow-hidden flex-1">
                             <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${skill.level}%` }}></div>
                           </div>
                           <span className="font-mono text-[11px] font-bold text-muted-foreground w-8 text-right">{skill.level}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-8 text-center">
                        <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 bg-[#E8E8E4] text-muted-foreground rounded-full font-mono text-[11px] font-bold">
                          {skill.order}
                        </span>
                      </td>
                      <td className="py-4 px-8 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => {
                              setSelectedSkill(skill)
                              setIsFormOpen(true)
                            }}
                            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all shadow-sm"
                            title="Modifier"
                          >
                            <Edit2 size={16} strokeWidth={1.5} />
                          </button>
                          <button 
                            onClick={() => handleDelete(skill.id)}
                            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-red-600 hover:border-red-600 transition-all shadow-sm"
                            title="Supprimer"
                          >
                            <Trash2 size={16} strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center font-body text-muted-foreground">
                      Aucune compétence répertoriée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Forms */}
      <SkillForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        skill={selectedSkill} 
        onSuccess={fetchSkills}
      />
    </div>
  )
}

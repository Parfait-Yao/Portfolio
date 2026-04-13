"use client"
import React, { useEffect, useState } from "react"
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Filter,
  Check
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import ExperienceForm from "@/components/admin/ExperienceForm"
import EducationForm from "@/components/admin/EducationForm"

type Tab = "experience" | "education"

export default function AdminExperiencePage() {
  const [activeTab, setActiveTab] = useState<Tab>("experience")
  const [data, setData] = useState<{ experiences: any[], education: any[] }>({
    experiences: [],
    education: []
  })
  const [loading, setLoading] = useState(true)
  const [isExpFormOpen, setIsExpFormOpen] = useState(false)
  const [isEduFormOpen, setIsEduFormOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchData = async () => {
    setLoading(true)
    try {
      const [expRes, eduRes] = await Promise.all([
        fetch("/api/experience"),
        fetch("/api/education")
      ])
      
      const [expData, eduData] = await Promise.all([
        expRes.json(),
        eduRes.json()
      ])

      setData({
        experiences: Array.isArray(expData) ? expData : [],
        education: Array.isArray(eduData) ? eduData : []
      })
    } catch (error) {
      toast.error("Erreur lors du chargement des données")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id: string, type: Tab) => {
    if (!confirm(`Supprimer définitivement cette ${type === 'experience' ? 'expérience' : 'formation'} ?`)) return

    try {
      const res = await fetch(`/api/${type}/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Élément supprimé")
        fetchData()
      }
    } catch (error) {
      toast.error("Échec de la suppression")
    }
  }

  const filteredItems = (activeTab === "experience" ? data.experiences : data.education).filter(item => {
    const search = searchQuery.toLowerCase()
    if (activeTab === "experience") {
      return item.role.toLowerCase().includes(search) || item.company.toLowerCase().includes(search)
    } else {
      return item.degree.toLowerCase().includes(search) || item.school.toLowerCase().includes(search)
    }
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
            Gestion du <span className="text-muted-foreground">Parcours.</span>
          </h1>
          <p className="font-body text-[15px] text-[#6B6B6B] max-w-xl">
            Gérez vos expériences professionnelles et vos formations académiques pour maintenir un profil à jour et cohérent.
          </p>
        </div>
        
        <button 
          onClick={() => {
            setSelectedItem(null)
            if (activeTab === "experience") setIsExpFormOpen(true)
            else setIsEduFormOpen(true)
          }}
          className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-body font-bold text-[13px] uppercase tracking-widest hover:bg-primary/80 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} /> {activeTab === "experience" ? "Nouvelle Expérience" : "Nouvelle Formation"}
        </button>
      </section>

      {/* Tabs Layout */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 p-1 bg-muted border border-border rounded-2xl w-fit">
          <button 
            onClick={() => setActiveTab("experience")}
            className={cn(
              "px-6 py-3 rounded-xl font-body text-[12px] font-bold uppercase tracking-widest transition-all flex items-center gap-2",
              activeTab === "experience" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Briefcase size={14} /> Expériences
          </button>
          <button 
            onClick={() => setActiveTab("education")}
            className={cn(
              "px-6 py-3 rounded-xl font-body text-[12px] font-bold uppercase tracking-widest transition-all flex items-center gap-2",
              activeTab === "education" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <GraduationCap size={14} /> Formations
          </button>
        </div>

        {/* Content Table */}
        <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.02)]">
          {/* Filters bar */}
          <div className="p-6 md:p-8 bg-muted/50 border-b border-border flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder={activeTab === "experience" ? "Rôle, entreprise..." : "Diplôme, école..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 h-12 bg-card border border-border rounded-full text-[14px] font-body focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 font-body text-[12px] font-bold text-muted-foreground uppercase tracking-widest">
              <Filter size={14} /> <span className="text-foreground">{filteredItems.length}</span> Entrées
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-5 px-8 font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Détails</th>
                  <th className="py-5 px-8 font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest hidden md:table-cell">Dates</th>
                  <th className="py-5 px-8 font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Status</th>
                  <th className="py-5 px-8 font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E4]">
                {loading ? (
                  Array(3).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={4} className="px-8 py-10 h-24 bg-muted/30"></td>
                    </tr>
                  ))
                ) : filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="group hover:bg-muted transition-colors">
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center shrink-0 text-foreground group-hover:bg-card transition-all">
                             {activeTab === "experience" ? <Briefcase size={20} strokeWidth={1.5} /> : <GraduationCap size={20} strokeWidth={1.5} />}
                          </div>
                          <div>
                            <div className="font-body text-[15px] font-bold text-foreground">
                              {activeTab === "experience" ? item.role : item.degree}
                            </div>
                            <div className="font-body text-[12px] text-muted-foreground uppercase tracking-widest mt-0.5">
                              {activeTab === "experience" ? item.company : item.school}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-8 hidden md:table-cell">
                        <div className="flex flex-col gap-1">
                           <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-muted-foreground">
                              <Calendar size={12} />
                              {new Date(item.startDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                              <span> — </span>
                              {item.current ? "Présent" : item.endDate ? new Date(item.endDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }) : "?"}
                           </div>
                           {activeTab === "experience" && item.location && (
                             <div className="flex items-center gap-2 font-body text-[11px] text-[#B0B0B0]">
                                <MapPin size={10} /> {item.location}
                             </div>
                           )}
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        {item.current ? (
                           <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-black text-primary-foreground rounded-md text-[10px] font-bold uppercase tracking-widest">
                             <div className="w-1.5 h-1.5 bg-card rounded-full animate-pulse" />
                             En cours
                           </div>
                        ) : (
                          <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-muted border border-border rounded">Achevé</span>
                        )}
                      </td>
                      <td className="py-6 px-8 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => {
                              setSelectedItem(item)
                              if (activeTab === "experience") setIsExpFormOpen(true)
                              else setIsEduFormOpen(true)
                            }}
                            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all shadow-sm"
                            title="Modifier"
                          >
                            <Edit2 size={16} strokeWidth={1.5} />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id, activeTab)}
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
                      Aucun élément répertorié dans cette catégorie.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Forms */}
      <ExperienceForm 
        isOpen={isExpFormOpen} 
        onClose={() => setIsExpFormOpen(false)} 
        experience={selectedItem} 
        onSuccess={fetchData}
      />
      <EducationForm 
        isOpen={isEduFormOpen} 
        onClose={() => setIsEduFormOpen(false)} 
        education={selectedItem} 
        onSuccess={fetchData}
      />
    </div>
  )
}

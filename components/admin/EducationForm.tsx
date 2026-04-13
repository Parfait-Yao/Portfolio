"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { 
  X, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Type, 
  ArrowRight,
  School
} from "lucide-react"

const schema = z.object({
  school: z.string().min(2, "L'établissement est requis"),
  degree: z.string().min(2, "Le diplôme est requis"),
  field: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  startDate: z.string(),
  endDate: z.string().optional().nullable(),
  order: z.number(),
})

type FormValues = z.infer<typeof schema>

interface EducationFormProps {
  education?: any
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function EducationForm({ education, isOpen, onClose, onSuccess }: EducationFormProps) {
  const [loading, setLoading] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: education ? {
      school: education.school || "",
      degree: education.degree || "",
      field: education.field || "",
      description: education.description || "",
      startDate: education.startDate ? new Date(education.startDate).toISOString().split('T')[0] : "",
      endDate: education.endDate ? new Date(education.endDate).toISOString().split('T')[0] : "",
      order: education.order || 0,
    } : {
      school: "",
      degree: "",
      field: "",
      description: "",
      startDate: "",
      endDate: "",
      order: 0,
    }
  })

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    try {
      const url = education ? `/api/education/${education.id}` : "/api/education"
      const method = education ? "PUT" : "POST"
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (res.ok) {
        toast.success(education ? "Formation mise à jour" : "Nouvelle formation ajoutée")
        onSuccess()
        onClose()
      } else {
        toast.error("Échec de la sauvegarde")
      }
    } catch (error) {
      toast.error("Erreur réseau")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 bg-card/20 backdrop-blur-md overflow-hidden">
      <div className="bg-card border border-border rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="h-[80px] border-b border-border px-8 flex items-center justify-between bg-muted/30 shrink-0">
           <div className="flex items-center gap-3">
             <GraduationCap size={18} className="text-foreground" />
             <h2 className="font-display text-xl text-foreground">
               {education ? "Modifier la Formation." : "Nouvelle Formation."}
             </h2>
           </div>
           <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
             <X size={20} />
           </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-8 md:p-10 space-y-8">
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Établissement / École</label>
                <div className="relative">
                  <School className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0B0B0]" size={16} />
                  <input 
                    {...register("school")} 
                    className="w-full pl-12 pr-4 h-12 bg-muted border border-border rounded-xl font-body text-[14px] focus:outline-none focus:border-primary transition-colors"
                    placeholder="ex: Université Polytechnique"
                  />
                </div>
                {errors.school && <p className="text-red-600 text-[10px] font-bold">{errors.school.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Diplôme / Titre</label>
                  <input 
                    {...register("degree")} 
                    className="w-full h-12 bg-muted border border-border rounded-xl px-5 font-body text-[14px] focus:outline-none focus:border-primary transition-colors"
                    placeholder="ex: Master en Informatique"
                  />
                  {errors.degree && <p className="text-red-600 text-[10px] font-bold">{errors.degree.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Domaine d'études</label>
                  <input 
                    {...register("field")} 
                    className="w-full h-12 bg-muted border border-border rounded-xl px-5 font-body text-[14px] focus:outline-none focus:border-primary transition-colors"
                    placeholder="ex: Software Engineering"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Date de début</label>
                <input 
                  type="date"
                  {...register("startDate")} 
                  className="w-full h-12 bg-muted border border-border rounded-xl px-5 font-body text-[14px] focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Date de fin</label>
                <input 
                  type="date"
                  {...register("endDate")} 
                  className="w-full h-12 bg-muted border border-border rounded-xl px-5 font-body text-[14px] focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Priorité d'affichage</label>
              <input type="number" {...register("order", { valueAsNumber: true })} className="w-20 h-10 bg-muted border border-border rounded-lg text-center font-body text-[14px]" />
            </div>

            <div className="space-y-2">
              <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Description (Optionnel)</label>
              <textarea 
                {...register("description")} 
                className="w-full min-h-[120px] bg-muted border border-border rounded-xl p-5 font-body text-[14px] focus:outline-none focus:border-primary transition-colors resize-none leading-relaxed"
                placeholder="Détails sur les cours, mentions, projets académiques..."
              />
            </div>

          </div>

          <div className="p-8 border-t border-border flex flex-col md:flex-row gap-4 items-center justify-between bg-muted/30 sticky bottom-0">
            <button 
              type="button"
              onClick={onClose}
              className="font-body text-[13px] font-bold text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-primary text-primary-foreground px-12 py-4 rounded-full font-body font-bold text-[13px] uppercase tracking-widest hover:bg-primary/80 transition-colors flex items-center gap-3 disabled:opacity-50 w-full md:w-auto justify-center"
            >
              {loading ? "Chargement..." : <>{education ? "Mettre à jour" : "Ajouter au parcours"} <ArrowRight size={16} /></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

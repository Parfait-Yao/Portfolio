"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { 
  X, 
  Code2, 
  ArrowRight
} from "lucide-react"

const schema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  level: z.number().min(0).max(100, "Le niveau doit être entre 0 et 100"),
  category: z.enum(["Frontend", "Backend", "DevOps", "Design"]),
  icon: z.string().optional().nullable().transform(e => e === "" ? null : e),
  order: z.number(),
})

type FormValues = z.infer<typeof schema>

interface SkillFormProps {
  skill?: any
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function SkillForm({ skill, isOpen, onClose, onSuccess }: SkillFormProps) {
  const [loading, setLoading] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: skill ? {
      name: skill.name || "",
      level: skill.level || 50,
      category: skill.category || "Frontend",
      icon: skill.icon || "",
      order: skill.order || 0,
    } : {
      name: "",
      level: 50,
      category: "Frontend",
      icon: "",
      order: 0,
    }
  })

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    try {
      const url = skill ? `/api/skills/${skill.id}` : "/api/skills"
      const method = skill ? "PUT" : "POST"
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (res.ok) {
        toast.success(skill ? "Compétence mise à jour" : "Nouvelle compétence ajoutée")
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
      <div className="bg-card border border-border rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="h-[80px] border-b border-border px-8 flex items-center justify-between bg-muted/30 shrink-0">
           <div className="flex items-center gap-3">
             <Code2 size={18} className="text-foreground" />
             <h2 className="font-display text-xl text-foreground">
               {skill ? "Modifier la Compétence." : "Nouvelle Compétence."}
             </h2>
           </div>
           <button type="button" onClick={onClose} className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
             <X size={20} />
           </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-8 md:p-10 space-y-8">
            
            <div className="space-y-2">
              <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Nom (ex: React, Node.js)</label>
              <input 
                {...register("name")} 
                className="w-full h-12 bg-muted border border-border rounded-xl px-5 font-body text-[14px] focus:outline-none focus:border-primary transition-colors"
                placeholder="Nom de la compétence"
              />
              {errors.name && <p className="text-red-600 text-[10px] font-bold">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Niveau (%)</label>
                  <span className="font-body text-[11px] font-bold text-foreground">{watch("level")}%</span>
                </div>
                <input 
                  type="range"
                  min="0" max="100"
                  {...register("level", { valueAsNumber: true })} 
                  className="w-full h-2 bg-[#E8E8E4] rounded-full appearance-none outline-none accent-[#0A0A0A] cursor-pointer"
                />
                {errors.level && <p className="text-red-600 text-[10px] font-bold">{errors.level.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Catégorie</label>
                <select 
                  {...register("category")}
                  className="w-full h-12 bg-muted border border-border rounded-xl px-5 font-body text-[14px] focus:outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Design">Design</option>
                </select>
                {errors.category && <p className="text-red-600 text-[10px] font-bold">{errors.category.message}</p>}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="space-y-2 flex-grow">
                <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Icône (facultatif)</label>
                <input 
                  {...register("icon")} 
                  className="w-full h-12 bg-muted border border-border rounded-xl px-5 font-body text-[14px] focus:outline-none focus:border-primary transition-colors"
                  placeholder="URL d'icône ou classe"
                />
              </div>
              
              <div className="space-y-2 w-24">
                <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Priorité</label>
                <input type="number" {...register("order", { valueAsNumber: true })} className="w-full h-12 bg-muted border border-border rounded-xl text-center font-body text-[14px] focus:outline-none focus:border-primary" />
              </div>
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
              {loading ? "Chargement..." : <>{skill ? "Mettre à jour" : "Ajouter"} <ArrowRight size={16} /></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

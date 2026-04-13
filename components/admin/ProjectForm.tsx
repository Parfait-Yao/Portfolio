"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { 
  Upload, 
  X, 
  Trash2, 
  Plus, 
  Check, 
  ExternalLink, 
  Layout,
  Type,
  Code,
  Layers,
  ArrowRight,
  GitBranch
} from "lucide-react"
import { cn } from "@/lib/utils"

const schema = z.object({
  title: z.string().min(2, "Le titre est trop court"),
  description: z.string().min(5, "La description est trop courte"),
  longDesc: z.string(),
  imageUrl: z.string(),
  tags: z.string(),
  githubUrl: z.string(),
  liveUrl: z.string(),
  featured: z.boolean(),
  order: z.number(),
})

type FormValues = z.infer<typeof schema>

interface ProjectFormProps {
  project?: any
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function ProjectForm({ project, isOpen, onClose, onSuccess }: ProjectFormProps) {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: project ? {
      title: project.title || "",
      description: project.description || "",
      longDesc: project.longDesc || "",
      imageUrl: project.imageUrl || "",
      tags: Array.isArray(project.tags) ? project.tags.join(", ") : "",
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      featured: project.featured || false,
      order: project.order || 0,
    } : {
      title: "",
      description: "",
      longDesc: "",
      imageUrl: "",
      tags: "",
      githubUrl: "",
      liveUrl: "",
      featured: false,
      order: 0,
    }
  })

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    const data = {
      ...values,
      tags: values.tags ? values.tags.split(",").map(t => t.trim()) : [],
    }

    try {
      const url = project ? `/api/projects/${project.id}` : "/api/projects"
      const method = project ? "PUT" : "POST"
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        toast.success(project ? "Archive mise à jour" : "Nouvelle archive créée")
        onSuccess()
        onClose()
      } else {
        toast.error("Échec de la synchronisation")
      }
    } catch (error) {
      toast.error("Erreur réseau")
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = async () => {
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: JSON.stringify({ image: reader.result }),
        })
        const data = await res.json()
        if (data.url) {
          setValue("imageUrl", data.url)
          toast.success("Média synchronisé")
        }
      } catch (error) {
        toast.error("Échec de l'upload")
      } finally {
        setUploading(false)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 bg-card/20 backdrop-blur-md overflow-hidden">
      <div className="bg-card border border-border rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="h-[80px] border-b border-border px-8 flex items-center justify-between bg-muted/30 shrink-0">
           <div className="flex items-center gap-3">
             <Layout size={18} className="text-foreground" />
             <h2 className="font-display text-xl text-foreground">
               {project ? "Configuration Archive." : "Nouvelle Entrée."}
             </h2>
           </div>
           <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
             <X size={20} />
           </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-8 md:p-12 space-y-10">
            
            {/* Primary Info section */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 font-body text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 border-b border-border/50 pb-2">
                <Type size={12} /> Informations Générales
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Nom du projet</label>
                  <input 
                    {...register("title")} 
                    className="w-full h-12 bg-muted border border-border rounded-xl px-5 font-body text-[14px] focus:outline-none focus:border-primary transition-colors"
                    placeholder="ex: Portfolio V3"
                  />
                  {errors.title && <p className="text-red-600 text-[10px] font-bold">{errors.title.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Stack (Tags)</label>
                  <input 
                    {...register("tags")} 
                    className="w-full h-12 bg-muted border border-border rounded-xl px-5 font-body text-[14px] focus:outline-none focus:border-primary transition-colors"
                    placeholder="React, Next.js, Prisma..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Accroche (Courte)</label>
                <input 
                  {...register("description")} 
                  className="w-full h-12 bg-muted border border-border rounded-xl px-5 font-body text-[14px] focus:outline-none focus:border-primary transition-colors"
                  placeholder="Une phrase d'introduction marquante"
                />
                {errors.description && <p className="text-red-600 text-[10px] font-bold">{errors.description.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Case Study (Longue)</label>
                <textarea 
                  {...register("longDesc")} 
                  className="w-full min-h-[150px] bg-muted border border-border rounded-xl p-5 font-body text-[14px] focus:outline-none focus:border-primary transition-colors resize-none leading-relaxed"
                  placeholder="Détails techniques, défis et solutions..."
                />
              </div>
            </section>

            {/* Media section */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 font-body text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 border-b border-border/50 pb-2">
                <Layers size={12} /> Médias & Visuels
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="relative w-full md:w-48 h-32 bg-muted border border-border rounded-xl overflow-hidden flex items-center justify-center grayscale group-hover:grayscale-0 transition-all shrink-0">
                  {watch("imageUrl") ? (
                    <>
                      <img src={watch("imageUrl")} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => setValue("imageUrl", "")}
                        className="absolute top-2 right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-[#B0B0B0]">
                      <Upload size={24} strokeWidth={1} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Aucun Média</span>
                    </div>
                  )}
                  {uploading && (
                    <div className="absolute inset-0 bg-card/60 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 space-y-4">
                  <p className="font-body text-[13px] text-muted-foreground leading-relaxed">
                    Ajoutez une capture d'écran haute résolution pour présenter votre travail sous son meilleur jour. Format recommandé : 16:9.
                  </p>
                  <button 
                    type="button"
                    onClick={() => document.getElementById("img-upload")?.click()}
                    className="bg-card border border-primary text-foreground h-12 px-8 rounded-full font-body font-bold text-[12px] uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-50"
                    disabled={uploading}
                  >
                    {uploading ? "Traitement..." : "Charger un média"}
                  </button>
                  <input id="img-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>
            </section>

            {/* Links section */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 font-body text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 border-b border-border/50 pb-2">
                <Code size={12} /> Connexions Externes
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Repository (Git)</label>
                  <div className="relative">
                    <GitBranch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0B0B0]" size={16} />
                    <input {...register("githubUrl")} className="w-full pl-12 pr-4 h-12 bg-muted border border-border rounded-xl font-body text-[14px] focus:outline-none focus:border-primary transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Lien Live / Démo</label>
                  <div className="relative">
                    <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0B0B0]" size={16} />
                    <input {...register("liveUrl")} className="w-full pl-12 pr-4 h-12 bg-muted border border-border rounded-xl font-body text-[14px] focus:outline-none focus:border-primary transition-colors" />
                  </div>
                </div>
              </div>
            </section>

            {/* Config & Status */}
            <section className="pt-6 border-t border-border flex flex-wrap items-center justify-between gap-8">
               <div className="flex items-center gap-6">
                 <label className="flex items-center gap-3 cursor-pointer group">
                   <div className="relative">
                     <input type="checkbox" {...register("featured")} className="peer sr-only" />
                     <div className="w-10 h-5 bg-[#E8E8E4] rounded-full peer-checked:bg-primary transition-colors"></div>
                     <div className="absolute left-1 top-1 w-3 h-3 bg-card rounded-full transition-transform peer-checked:translate-x-5"></div>
                   </div>
                   <span className="font-body text-[13px] font-bold text-foreground uppercase tracking-widest">Mise en avant</span>
                 </label>
               </div>
               
               <div className="flex items-center gap-3 ml-auto">
                 <label className="font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Priorité</label>
                 <input type="number" {...register("order", { valueAsNumber: true })} className="w-20 h-10 bg-muted border border-border rounded-lg text-center font-body text-[14px]" />
               </div>
            </section>

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
              {loading ? "Traitement..." : <>{project ? "Mettre à jour" : "Lancer l'archive"} <ArrowRight size={16} /></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

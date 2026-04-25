"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { 
  X, 
  Briefcase, 
  MapPin, 
  Calendar, 
  Type, 
  ArrowRight,
  Clock
} from "lucide-react"

const schema = z.object({
  role: z.string().min(2, "Le rôle est requis"),
  company: z.string().min(2, "L'entreprise est requise"),
  location: z.string().optional(),
  description: z.string().min(10, "La description est trop courte"),
  startDate: z.string(),
  endDate: z.string().optional().nullable(),
  current: z.boolean(),
  order: z.number(),
  imageUrl: z.string().optional(),
  likes: z.number().default(0),
})

type FormValues = z.infer<typeof schema>

interface ExperienceFormProps {
  experience?: any
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function ExperienceForm({ experience, isOpen, onClose, onSuccess }: ExperienceFormProps) {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: experience ? {
      role: experience.role || "",
      company: experience.company || "",
      location: experience.location || "",
      description: experience.description || "",
      startDate: experience.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : "",
      endDate: experience.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : "",
      current: experience.current || false,
      order: experience.order || 0,
      imageUrl: experience.imageUrl || "",
      likes: experience.likes || 0,
    } : {
      role: "",
      company: "",
      location: "",
      description: "",
      startDate: "",
      endDate: "",
      current: false,
      order: 0,
      imageUrl: "",
      likes: 0,
    }
  })

  const isCurrent = watch("current")
  const imageUrl = watch("imageUrl")

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

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    try {
      const url = experience ? `/api/experience/${experience.id}` : "/api/experience"
      const method = experience ? "PUT" : "POST"
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          endDate: values.current ? null : values.endDate,
        }),
      })

      if (res.ok) {
        toast.success(experience ? "Expérience mise à jour" : "Nouvelle expérience ajoutée")
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
             <Briefcase size={18} className="text-foreground" />
             <h2 className="font-display text-xl text-foreground">
               {experience ? "Modifier l'Expérience." : "Nouvelle Expérience."}
             </h2>
           </div>
           <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
             <X size={20} />
           </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-8 md:p-10 space-y-8">
            
            {/* Image Upload Section */}
            <div className="space-y-4">
              <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Photo symbolisant l'expérience</label>
              <div className="flex items-center gap-6">
                <div className="relative w-32 h-32 bg-muted border border-border rounded-2xl overflow-hidden flex items-center justify-center group">
                  {imageUrl ? (
                    <>
                      <img src={imageUrl} alt="Experience Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => setValue("imageUrl", "")}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={20} className="text-white" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      {uploading ? (
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Clock size={20} strokeWidth={1} />
                          <span className="text-[9px] font-bold uppercase tracking-widest text-center px-2">Ajouter Photo</span>
                        </>
                      )}
                    </div>
                  )}
                  <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    onChange={handleImageUpload} 
                    accept="image/*"
                    disabled={uploading}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-[12px] text-muted-foreground leading-relaxed">
                    Une image aide à illustrer votre parcours (logo d'entreprise, photo de bureau, ou visuel symbolique).
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Poste / Rôle</label>
                <input 
                  {...register("role")} 
                  className="w-full h-12 bg-muted border border-border rounded-xl px-5 font-body text-[14px] focus:outline-none focus:border-primary transition-colors"
                  placeholder="ex: Développeur Fullstack"
                />
                {errors.role && <p className="text-red-600 text-[10px] font-bold">{errors.role.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Entreprise</label>
                <input 
                  {...register("company")} 
                  className="w-full h-12 bg-muted border border-border rounded-xl px-5 font-body text-[14px] focus:outline-none focus:border-primary transition-colors"
                  placeholder="ex: Tech Solutions Inc."
                />
                {errors.company && <p className="text-red-600 text-[10px] font-bold">{errors.company.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Localisation</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0B0B0]" size={16} />
                <input 
                  {...register("location")} 
                  className="w-full pl-12 pr-4 h-12 bg-muted border border-border rounded-xl font-body text-[14px] focus:outline-none focus:border-primary transition-colors"
                  placeholder="ex: Paris / Remote"
                />
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
                  disabled={isCurrent}
                  className="w-full h-12 bg-muted border border-border rounded-xl px-5 font-body text-[14px] focus:outline-none focus:border-primary transition-colors disabled:opacity-30"
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" {...register("current")} className="peer sr-only" />
                  <div className="w-10 h-5 bg-[#E8E8E4] rounded-full peer-checked:bg-primary transition-colors"></div>
                  <div className="absolute left-1 top-1 w-3 h-3 bg-card rounded-full transition-transform peer-checked:translate-x-5"></div>
                </div>
                <span className="font-body text-[13px] font-bold text-foreground uppercase tracking-widest">Poste actuel</span>
              </label>
              
              <div className="flex items-center gap-3 ml-auto">
                <label className="font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Priorité</label>
                <input type="number" {...register("order", { valueAsNumber: true })} className="w-20 h-10 bg-muted border border-border rounded-lg text-center font-body text-[14px]" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-body text-[11px] font-bold text-foreground/80 uppercase tracking-widest ml-1">Missions & Réalisations</label>
              <textarea 
                {...register("description")} 
                className="w-full min-h-[150px] bg-muted border border-border rounded-xl p-5 font-body text-[14px] focus:outline-none focus:border-primary transition-colors resize-none leading-relaxed"
                placeholder="Décrivez vos responsabilités et succès..."
              />
              {errors.description && <p className="text-red-600 text-[10px] font-bold">{errors.description.message}</p>}
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
              {loading ? "Chargement..." : <>{experience ? "Mettre à jour" : "Ajouter au profil"} <ArrowRight size={16} /></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

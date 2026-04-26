"use client"
import React, { useEffect, useState } from "react"

export const dynamic = "force-dynamic"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { 
  Upload, 
  User, 
  MapPin, 
  Mail, 
  FileText, 
  Globe, 
  Link as LinkIcon, 
  Phone,
  ArrowRight,
  Check,
  Trash2
} from "lucide-react"
import { cn } from "@/lib/utils"

const schema = z.object({
  id: z.string().optional().nullable(),
  bio: z.string().min(10, "La bio est trop courte"),
  photo: z.string().optional().nullable(),
  cv: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email("Email invalide").optional().nullable().or(z.literal("")),
  github: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
})

type FormValues = z.infer<typeof schema>

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [uploading, setUploading] = useState<string | null>(null)

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      bio: "",
      location: "",
      email: "",
      github: "",
      linkedin: "",
      twitter: "",
      photo: "",
      cv: "",
    }
  })

  useEffect(() => {
    fetch("/api/about")
      .then(res => res.json())
      .then(data => {
        if (data && data.id) {
          // Convert database nulls to empty strings so React inputs don't complain 
          // and Zod validates them correctly
          const safeData = { ...data }
          Object.keys(safeData).forEach((key) => {
             if (safeData[key] === null) {
               safeData[key] = ""
             }
          })
          reset(safeData)
        }
        setFetching(false)
      })
      .catch(() => setFetching(false))
  }, [reset])

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (res.ok) {
        toast.success("Profil mis à jour avec succès !")
      } else {
        toast.error("Erreur du serveur lors de la sauvegarde.")
      }
    } catch {
      toast.error("Erreur de connexion réseau.")
    } finally {
      setLoading(false)
    }
  }

  const onError = (errors: any) => {
    toast.error("Validation échouée : Veuillez vérifier les champs (ex: Biographie trop courte).")
    console.log("Form validation errors:", errors)
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "photo" | "cv") => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(field)
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
          setValue(field, data.url)
          toast.success(`${field === "photo" ? "Photo" : "CV"} mis à jour`)
        }
      } catch {
        toast.error("Échec de l'upload")
      } finally {
        setUploading(null)
      }
    }
  }

  if (fetching) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-border border-t-[#0A0A0A] rounded-full animate-spin"></div>
    </div>
  )

  return (
    <div className="space-y-12 pb-32">
      {/* Header section */}
      <section>
        <span className="inline-flex items-center gap-1.5 bg-[#EFEFEB] text-foreground/80 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase mb-4">
          Identité
        </span>
        <h1 className="font-display text-[clamp(32px,5vw,48px)] leading-[1.1] text-foreground mb-4">
          Profil <span className="text-muted-foreground">Administrateur.</span>
        </h1>
        <p className="font-body text-[15px] text-[#6B6B6B] max-w-xl">
          Gérez votre biographie publique, vos informations de contact et vos liens professionnels.
        </p>
      </section>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Side Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Profile Photo */}
            <div className="bg-muted border border-border rounded-2xl p-8 text-center">
              <div className="relative w-32 h-32 mx-auto mb-6 group">
                <div className="w-full h-full rounded-full bg-card border border-border overflow-hidden flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                  {watch("photo") ? (
                    <img src={watch("photo") || ""} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} strokeWidth={1} className="text-[#B0B0B0]" />
                  )}
                </div>
                {uploading === "photo" && (
                  <div className="absolute inset-0 bg-card/60 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <label className="absolute bottom-1 right-1 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg">
                  <Upload size={16} />
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(e, "photo")} />
                </label>
              </div>
              <h3 className="font-body text-[14px] font-bold text-foreground mb-1">Portrait officiel</h3>
              <p className="font-body text-[11px] text-muted-foreground uppercase tracking-widest">Minimaliste & Professionnel</p>
            </div>

            {/* Resume / CV */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText size={20} strokeWidth={1.5} className="text-foreground" />
                <h3 className="font-body text-[15px] font-bold text-foreground">Document CV</h3>
              </div>
              <div className="space-y-4">
                {watch("cv") ? (
                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl border border-border">
                    <span className="font-body text-[12px] font-bold text-foreground uppercase tracking-wider">CV_ACTIF.PDF</span>
                    <button type="button" onClick={() => setValue("cv", "")} className="text-muted-foreground hover:text-red-600 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <p className="font-body text-[12px] text-muted-foreground bg-muted p-4 rounded-xl border border-dashed border-[#D0D0CB]">Aucun fichier lié</p>
                )}
                <button 
                  type="button"
                  onClick={() => document.getElementById("cv-upload")?.click()}
                  className="w-full bg-card border border-primary text-foreground h-12 rounded-full font-body font-bold text-[12px] uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-50"
                  disabled={!!uploading}
                >
                  {uploading === "cv" ? "Traitement..." : "Charger nouveau CV"}
                </button>
                <input id="cv-upload" type="file" className="hidden" accept=".pdf" onChange={(e) => handleUpload(e, "cv")} />
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
              <h3 className="font-body text-[15px] font-bold text-foreground mb-2 uppercase tracking-widest">Connectivité</h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">
                    <Globe size={12} /> GitHub
                  </div>
                  <input {...register("github")} className="w-full bg-muted border border-border rounded-lg px-4 h-10 font-body text-[14px] focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">
                    <LinkIcon size={12} /> LinkedIn
                  </div>
                  <input {...register("linkedin")} className="w-full bg-muted border border-border rounded-lg px-4 h-10 font-body text-[14px] focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 space-y-10">
              {/* Bio */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl text-foreground">Biographie</h3>
                  <span className="font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Markdown supporté</span>
                </div>
                <textarea 
                  {...register("bio")} 
                  className="w-full min-h-[400px] bg-muted border border-border rounded-2xl p-8 font-body text-[16px] text-[#2D2D2D] leading-relaxed focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Racontez votre histoire..."
                />
                {errors.bio && <p className="text-red-600 text-[11px] font-bold">{errors.bio.message}</p>}
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-border">
                <div className="space-y-2">
                  <label className="font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Localisation</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0B0B0]" size={16} />
                    <input {...register("location")} className="w-full pl-12 pr-4 h-12 bg-muted border border-border rounded-xl font-body text-[14px] focus:outline-none focus:border-primary transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-body text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Email Public</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0B0B0]" size={16} />
                    <input {...register("email")} className="w-full pl-12 pr-4 h-12 bg-muted border border-border rounded-xl font-body text-[14px] focus:outline-none focus:border-primary transition-colors" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-10">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-primary text-primary-foreground px-12 py-5 rounded-full font-body font-bold text-[14px] uppercase tracking-widest hover:bg-primary/80 transition-colors flex items-center gap-3 disabled:opacity-50"
                >
                  {loading ? "Synchronisation..." : <>Sauvegarder les modifications <ArrowRight size={18} /></>}
                </button>
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  )
}

"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Mail, MapPin, Send, Globe, Link as LinkIcon, User, ArrowRight, ChevronRight, MessageSquare } from "lucide-react"
import Section from "@/components/public/Section"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"

const schema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  subject: z.string().optional(),
  body: z.string().min(10, "Le message est trop court"),
})

type FormValues = z.infer<typeof schema>

export default function ContactPage() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "Contact via Portfolio",
      body: "",
    }
  })

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (res.ok) {
        toast.success("Message envoyé !")
        setSubmitted(true)
        reset()
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        toast.error("Erreur d'envoi.")
      }
    } catch (error) {
      toast.error("Erreur réseau.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background min-h-screen relative overflow-x-hidden">
      {/* Header Section */}
      <Section className="pt-[160px] pb-[40px] md:pt-[200px] md:pb-[100px]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <span className="pill-tag mb-6">
            {t.contactPage.tag}
          </span>
          <h1 className="mb-8 font-serif text-[clamp(28px,11vw,80px)] leading-[1.05] tracking-tight text-pretty">
            {t.contactPage.title1} <br /> <span className="text-foreground/40 italic">{t.contactPage.title2}</span>
          </h1>
          <p className="font-body text-[17px] md:text-[21px] text-foreground/70 leading-relaxed max-w-2xl px-1">
            {t.contactPage.desc}
          </p>
        </div>
      </Section>

      {/* Main Blob Card Section */}
      <Section className="pb-[140px] pt-0">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-card border border-border rounded-[40px] md:rounded-[80px] p-8 md:p-20 shadow-[0_40px_100px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col lg:flex-row gap-16 lg:gap-24"
          >
            {/* Decoration blobs in corners to give the "splat" feel */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-background rounded-full opacity-50 pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-background rounded-full opacity-30 pointer-events-none" />

            {/* Left Side: Let's talk & Form */}
            <div className="flex-1 space-y-12 relative z-10">
              <div>
                <h2 className="font-serif text-[42px] leading-tight mb-4">{t.contactPage.letstalk}</h2>
                <p className="font-body text-foreground/50 text-[15px] leading-relaxed max-w-sm">
                  {t.contactPage.letstalkDesc}
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                   <div className="space-y-2">
                     <label className="text-[11px] font-bold text-foreground/30 uppercase tracking-widest ml-1">{t.contactPage.formName}</label>
                     <input 
                       {...register("name")}
                       placeholder={t.contactPage.formNamePlaceholder}
                       className="w-full bg-muted border-none rounded-2xl px-6 h-14 font-body text-[15px] focus:ring-2 focus:ring-foreground/5 transition-all outline-none text-foreground"
                     />
                     {errors.name && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.name.message}</p>}
                   </div>

                   <div className="space-y-2">
                     <label className="text-[11px] font-bold text-foreground/30 uppercase tracking-widest ml-1">{t.contactPage.formEmail}</label>
                     <input 
                       {...register("email")}
                       placeholder="votre@email.com"
                       className="w-full bg-muted border-none rounded-2xl px-6 h-14 font-body text-[15px] focus:ring-2 focus:ring-foreground/5 transition-all outline-none text-foreground"
                     />
                     {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.email.message}</p>}
                   </div>

                   <div className="space-y-2">
                     <label className="text-[11px] font-bold text-foreground/30 uppercase tracking-widest ml-1">{t.contactPage.formMsg}</label>
                     <textarea 
                       {...register("body")}
                       placeholder={t.contactPage.formMsgPlaceholder}
                       rows={4}
                       className="w-full bg-muted border-none rounded-[28px] p-6 font-body text-[15px] focus:ring-2 focus:ring-foreground/5 transition-all outline-none resize-none text-foreground"
                     ></textarea>
                     {errors.body && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.body.message}</p>}
                   </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-primary-foreground px-10 h-14 lg:h-16 rounded-full font-jakarta font-bold text-[13px] uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
                >
                  {loading ? t.contactPage.btnSending : submitted ? t.contactPage.btnSent : t.contactPage.btnSend}
                </motion.button>
              </form>
            </div>

            {/* Right Side: Illustration & Details */}
            <div className="w-full lg:w-[380px] flex flex-col justify-between pt-4 lg:pt-10 relative z-10">
              
              {/* Abstract Illustration Placeholder */}
              <div className="relative aspect-square w-full mb-12 flex items-center justify-center">
                 <div className="absolute inset-0 bg-black/5 rounded-full scale-90 blur-2xl opacity-50" />
                 <div className="relative">
                    <div className="w-24 h-24 bg-card rounded-3xl shadow-xl flex items-center justify-center transform -rotate-12 translate-x-4 border border-border">
                       <Mail size={32} strokeWidth={1} className="text-foreground/20" />
                    </div>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary rounded-2xl shadow-2xl flex items-center justify-center transform rotate-12 -translate-y-4">
                       <Send size={24} className="text-primary-foreground" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-muted rounded-full border border-border flex items-center justify-center">
                       <MessageSquare size={18} className="text-foreground/30" />
                    </div>
                 </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-8">
                 <div className="flex items-start gap-4">
                    <MapPin size={18} className="text-foreground/20 shrink-0 mt-1" />
                    <div>
                       <p className="text-[12px] font-bold text-foreground underline decoration-foreground/10 underline-offset-4 decoration-2">Abidjan, Côte d'Ivoire</p>
                       <p className="text-[11px] text-foreground/40 font-medium">Marcory, Zone 4</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <Mail size={18} className="text-foreground/20 shrink-0 mt-1" />
                    <p className="text-[12px] font-bold text-foreground border-b border-border pb-1">parfaitericyao123@gmail.com</p>
                 </div>
              </div>

              {/* Social Icons Bottom Right */}
              <div className="flex gap-4 mt-16 lg:mt-0 justify-start lg:justify-end">
                 <a href="#" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-foreground/40 hover:bg-foreground hover:text-background transition-all">
                    <Globe size={18} strokeWidth={1.5} />
                 </a>
                 <a href="#" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-foreground/40 hover:bg-foreground hover:text-background transition-all">
                    <LinkIcon size={18} strokeWidth={1.5} />
                 </a>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Spacing to clear BottomNav */}
      <div className="h-32 bg-transparent" />
    </div>
  )
}

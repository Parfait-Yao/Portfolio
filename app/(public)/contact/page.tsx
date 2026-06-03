"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Mail, MapPin, Send, Globe, Link as LinkIcon, User, MessageSquare, ArrowRight, Sparkles, Phone } from "lucide-react"
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

/* SVG Communication illustration */
function ContactIllustration() {
  return (
    <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[280px] mx-auto">
      {/* Outer rings */}
      <circle cx="160" cy="160" r="150" stroke="currentColor" strokeOpacity="0.04" strokeWidth="1" />
      <circle cx="160" cy="160" r="120" stroke="currentColor" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="6 4" />
      <circle cx="160" cy="160" r="90" stroke="currentColor" strokeOpacity="0.06" strokeWidth="1" />

      {/* Center envelope */}
      <rect x="108" y="126" width="104" height="72" rx="10" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.5" />
      <path d="M108 136l52 36 52-36" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5" strokeLinecap="round" />

      {/* Send button top-right */}
      <circle cx="232" cy="110" r="26" fill="currentColor" fillOpacity="0.08" />
      <circle cx="232" cy="110" r="18" fill="currentColor" fillOpacity="0.1" />
      <path d="M224 110l10-4-4 10-2-3-4-3zm0 0l6 3" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Message bubble bottom-left */}
      <rect x="58" y="188" width="68" height="44" rx="14" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
      <path d="M72 232l-8 8v-8h-6" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" strokeLinejoin="round" />
      <line x1="72" y1="204" x2="110" y2="204" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="72" y1="212" x2="100" y2="212" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="72" y1="220" x2="106" y2="220" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.5" strokeLinecap="round" />

      {/* Notification dot */}
      <circle cx="245" cy="98" r="8" fill="#10b981" fillOpacity="0.8" />
      <circle cx="245" cy="98" r="12" fill="#10b981" fillOpacity="0.15" />

      {/* Floating small elements */}
      <circle cx="100" cy="108" r="6" fill="currentColor" fillOpacity="0.08" />
      <circle cx="88" cy="160" r="4" fill="currentColor" fillOpacity="0.06" />
      <circle cx="244" cy="190" r="5" fill="currentColor" fillOpacity="0.07" />
      <circle cx="196" cy="216" r="7" fill="currentColor" fillOpacity="0.06" />

      {/* Stars */}
      <path d="M130 90l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="currentColor" fillOpacity="0.1" />
      <path d="M210 248l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5z" fill="currentColor" fillOpacity="0.1" />
    </svg>
  )
}

/* Input with icon wrapper */
function InputField({ icon: Icon, label, error, children }: { icon: any; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-[10px] font-bold text-foreground/35 uppercase tracking-widest ml-1">
        <Icon size={11} className="opacity-70" />
        {label}
      </label>
      <div className="relative group/input">
        {children}
        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300" />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-red-500 text-[10px] font-bold ml-1 flex items-center gap-1"
          >
            <span>⚠</span> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

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
        toast.success("Message envoyé avec succès ! 🎉")
        setSubmitted(true)
        reset()
        setTimeout(() => setSubmitted(false), 6000)
      } else {
        toast.error("Erreur lors de l'envoi.")
      }
    } catch (error) {
      toast.error("Erreur réseau.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background min-h-screen relative overflow-x-hidden aurora-bg">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

      {/* Header */}
      <Section className="pt-[160px] pb-[40px] md:pt-[200px] md:pb-[80px]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="pill-tag mb-6">{t.contactPage.tag}</span>
            <h1 className="mb-8 font-serif text-[clamp(28px,10vw,76px)] leading-[1.05] tracking-tight">
              {t.contactPage.title1} <br />
              <span className="text-foreground/35 italic">{t.contactPage.title2}</span>
            </h1>
            <p className="font-body text-[17px] md:text-[20px] text-foreground/60 leading-relaxed max-w-2xl">
              {t.contactPage.desc}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Main card */}
      <Section className="pb-[120px] pt-0">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative bg-card border border-border rounded-[40px] md:rounded-[60px] p-8 md:p-16 shadow-[0_40px_120px_rgba(0,0,0,0.05)] overflow-hidden"
          >
            {/* Corner blobs */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500/4 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/4 rounded-full blur-3xl pointer-events-none" />
            {/* Top gradient accent line */}
            <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-foreground/8 to-transparent" />

            <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 relative z-10">

              {/* ── LEFT: Form ── */}
              <div className="flex-1 space-y-10">
                <div>
                  <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40 bg-foreground/4 px-3 py-1.5 rounded-full mb-5">
                    <Sparkles size={10} />
                    Disponible pour des projets
                  </div>
                  <h2 className="font-serif text-[clamp(28px,5vw,42px)] leading-tight text-foreground">
                    {t.contactPage.letstalk}
                  </h2>
                  <p className="font-body text-foreground/45 text-[14px] leading-relaxed max-w-sm mt-3">
                    {t.contactPage.letstalkDesc}
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name */}
                  <InputField icon={User} label={t.contactPage.formName} error={errors.name?.message}>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/25 pointer-events-none">
                        <User size={15} />
                      </div>
                      <input
                        {...register("name")}
                        placeholder={t.contactPage.formNamePlaceholder}
                        className="input-premium pl-11 pr-5"
                      />
                    </div>
                  </InputField>

                  {/* Email */}
                  <InputField icon={Mail} label={t.contactPage.formEmail} error={errors.email?.message}>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/25 pointer-events-none">
                        <Mail size={15} />
                      </div>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="votre@email.com"
                        className="input-premium pl-11 pr-5"
                      />
                    </div>
                  </InputField>

                  {/* Message */}
                  <InputField icon={MessageSquare} label={t.contactPage.formMsg} error={errors.body?.message}>
                    <div className="relative">
                      <div className="absolute left-4 top-5 text-foreground/25 pointer-events-none">
                        <MessageSquare size={15} />
                      </div>
                      <textarea
                        {...register("body")}
                        placeholder={t.contactPage.formMsgPlaceholder}
                        rows={5}
                        className="textarea-premium pl-11 pt-4"
                      />
                    </div>
                  </InputField>

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={loading}
                    className="relative w-full sm:w-auto bg-primary text-primary-foreground px-12 h-14 rounded-full font-jakarta font-bold text-[12px] uppercase tracking-widest hover:opacity-92 transition-all flex items-center justify-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.18)] disabled:opacity-50 overflow-hidden group/btn"
                  >
                    {/* Shimmer on hover */}
                    <span className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <AnimatePresence mode="wait">
                      {submitted ? (
                        <motion.span
                          key="sent"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-3"
                        >
                          <span className="text-base">✓</span>
                          {t.contactPage.btnSent}
                        </motion.span>
                      ) : loading ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-3"
                        >
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
                            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          {t.contactPage.btnSending}
                        </motion.span>
                      ) : (
                        <motion.span
                          key="send"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-3"
                        >
                          <Send size={15} />
                          {t.contactPage.btnSend}
                          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>
              </div>

              {/* ── RIGHT: Illustration & Info ── */}
              <div className="w-full lg:w-[340px] flex flex-col gap-10">

                {/* SVG illustration */}
                <motion.div
                  className="relative text-foreground animate-float-slow"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <ContactIllustration />
                </motion.div>

                {/* Contact details */}
                <div className="space-y-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground/30 mb-5">Contact direct</h3>

                  {[
                    {
                      icon: MapPin,
                      label: "Abidjan, Côte d'Ivoire",
                      sub: "Marcory, Zone 4",
                      color: "text-rose-500",
                      bg: "bg-rose-500/10",
                    },
                    {
                      icon: Mail,
                      label: "parfaitericyao123@gmail.com",
                      sub: "Réponse sous 24h",
                      color: "text-blue-500",
                      bg: "bg-blue-500/10",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/40 transition-colors group/contact">
                      <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center shrink-0 group-hover/contact:scale-110 transition-transform`}>
                        <item.icon size={16} strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-foreground leading-tight">{item.label}</p>
                        <p className="text-[11px] text-foreground/40 mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social links */}
                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground/30 mb-4">Réseaux</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: Globe, label: "Web", color: "hover:bg-indigo-500 hover:text-white hover:border-indigo-500" },
                      { icon: LinkIcon, label: "LinkedIn", color: "hover:bg-blue-600 hover:text-white hover:border-blue-600" },
                    ].map((social, i) => (
                      <motion.a
                        key={i}
                        href="#"
                        whileHover={{ y: -3 }}
                        className={`w-12 h-12 bg-muted border border-border rounded-2xl flex items-center justify-center text-foreground/40 transition-all duration-200 ${social.color}`}
                        title={social.label}
                      >
                        <social.icon size={17} strokeWidth={1.5} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      <div className="h-24" />
    </div>
  )
}

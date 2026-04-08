import React from "react"
import { prisma } from "@/lib/prisma"
import { MapPin, Mail, Globe, Link as LinkIcon, User } from "lucide-react"
import Section from "@/components/public/Section"
import { cookies } from 'next/headers'
import { translations } from '@/lib/translations'

export default async function AboutPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('app-language')?.value as 'fr' | 'en') || 'fr';
  const t = translations[locale];

  const about = await prisma.about.findFirst()

  return (
    <div className="bg-background min-h-screen">
      {/* Hero / Intro section */}
      <Section className="pt-[140px] pb-12 md:pt-[180px]">
        <div className="max-w-6xl mx-auto px-6">
          <span className="pill-tag mb-6">
            {t.aboutPage.tag}
          </span>
          <h1 className="mb-8 font-serif text-[clamp(40px,8vw,80px)] leading-[1.05] tracking-tight">
            {t.aboutPage.title1} <br /> <span className="text-foreground/50 italic">{t.aboutPage.title2}</span>
          </h1>
        </div>
      </Section>

      {/* Main content grid */}
      <Section className="pb-[120px] pt-0">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start">
          
          {/* Photo & Basic Info Column */}
          <div className="space-y-16 lg:sticky lg:top-32">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-muted border border-border grayscale hover:grayscale-0 transition-all duration-1000 shadow-[0_20px_50px_rgba(0,0,0,0.03)] mx-auto md:mx-0">
               {about?.photo && (
                 <img 
                    src={about.photo} 
                    alt="Parfait Eric" 
                    className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[2000ms]"
                 />
               )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div>
                <h3 className="text-[12px] font-bold tracking-[0.15em] uppercase text-foreground/40 mb-6">{t.aboutPage.contactTitle}</h3>
                <div className="space-y-4 font-jakarta text-foreground font-semibold text-[16px]">
                  <a href={`mailto:${about?.email}`} className="flex items-center gap-4 hover:text-black/50 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground/60">
                      <Mail size={14} strokeWidth={2} />
                    </div>
                    {about?.email}
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground/60">
                      <MapPin size={14} strokeWidth={2} />
                    </div>
                    {about?.location}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[12px] font-bold tracking-[0.15em] uppercase text-foreground/40 mb-6">{t.aboutPage.socialTitle}</h3>
                <div className="flex gap-4">
                   <a href={about?.github || "#"} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-foreground/5 rounded-full flex items-center justify-center hover:bg-foreground hover:text-background transition-all shadow-sm group">
                    <Globe size={18} strokeWidth={1.5} className="group-hover:rotate-12 transition-transform" />
                  </a>
                   <a href={about?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-foreground/5 rounded-full flex items-center justify-center hover:bg-foreground hover:text-background transition-all shadow-sm group">
                    <LinkIcon size={18} strokeWidth={1.5} className="group-hover:-rotate-12 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Statistics Column */}
          <div className="pt-0 md:pt-12">
            <h2 className="text-[clamp(32px,5vw,48px)] font-serif text-foreground leading-[1.1] mb-12">
            {t.aboutPage.contentTitle1} <br /> <span className="text-foreground/40 italic">{t.aboutPage.contentTitle2}</span>
          </h2>
            <div className="font-body text-[18px] md:text-[20px] text-foreground/70 leading-[1.7] space-y-8 whitespace-pre-line max-w-xl">
              {about?.bio}
            </div>

            <div className="grid grid-cols-2 gap-12 mt-24 pt-16 border-t border-border">
              <div className="group">
                <p className="font-serif text-6xl text-foreground transition-transform group-hover:translate-x-1">05+</p>
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground/50 mt-6">{t.aboutPage.stat1}</p>
              </div>
              <div className="group">
                <p className="font-serif text-6xl text-foreground transition-transform group-hover:translate-x-1">40+</p>
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground/50 mt-6">{t.aboutPage.stat2}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

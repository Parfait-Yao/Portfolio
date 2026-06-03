import React from "react"
import { MapPin, Mail } from "lucide-react"
import Section from "@/components/public/Section"
import { cookies } from 'next/headers'
import AboutClient from "./AboutClient"

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('app-language')?.value as 'fr' | 'en') || 'fr';

  const { translations } = await import('@/lib/translations')
  const { prisma } = await import("@/lib/prisma")

  const t = translations[locale];

  let about = null;
  try {
    about = await prisma.about.findFirst();
  } catch (error) {
    console.error("About database fetch failed", error);
  }

  return (
    <div className="bg-background min-h-screen relative overflow-hidden aurora-bg">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      {/* Header */}
      <Section className="pt-[140px] pb-12 md:pt-[180px]">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <span className="pill-tag mb-6">{t.aboutPage.tag}</span>
          <h1 className="mb-8 font-serif text-[clamp(40px,8vw,80px)] leading-[1.05] tracking-tight">
            {t.aboutPage.title1} <br />
            <span className="text-foreground/35 italic">{t.aboutPage.title2}</span>
          </h1>
        </div>
      </Section>

      <Section className="pb-[120px] pt-0">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <AboutClient about={about} t={t} />
        </div>
      </Section>
    </div>
  )
}

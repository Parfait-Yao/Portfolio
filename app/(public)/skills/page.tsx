import React from "react"
import { ChevronRight } from "lucide-react"
import Section from "@/components/public/Section"
import Link from "next/link"
import { cookies } from 'next/headers'
import SkillsClient from "./SkillsClient"

export const dynamic = 'force-dynamic'

export default async function SkillsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('app-language')?.value as 'fr' | 'en') || 'fr';

  const { translations } = await import('@/lib/translations')
  const { prisma } = await import("@/lib/prisma")

  const t = translations[locale];

  let skillsData: any[] = []
  try {
    skillsData = await prisma.skill.findMany({ orderBy: { order: 'asc' } })
  } catch (error) {
    console.error("Failed to fetch skills:", error)
  }

  return (
    <div className="bg-background min-h-screen relative overflow-hidden aurora-bg">
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

      {/* Header */}
      <Section className="pt-[140px] pb-[72px] md:pt-[180px] md:pb-[100px]">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <span className="pill-tag mb-6">{t.skillsPage.expertise}</span>
          <h1 className="mb-8 text-foreground">
            {t.skillsPage.title1}{" "}
            <span className="text-foreground/40 italic">{t.skillsPage.title2}</span>
          </h1>
          <p className="font-body text-[18px] text-foreground/60 leading-relaxed max-w-2xl">
            {t.skillsPage.description}
          </p>
        </div>
      </Section>

      {/* Skills grid — client component for animations */}
      <Section className="pb-[120px] pt-0">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SkillsClient skillsData={skillsData} noSkillsLabel={t.skillsPage.noSkills} />
        </div>
      </Section>

      {/* CTA */}
      <div className="mx-4 md:mx-10 mb-10 rounded-[40px] overflow-hidden bg-gradient-cta">
      <Section className="text-center py-20 relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-primary-foreground mb-10">
            {t.skillsPage.practiceTitle1} <br />
            <span className="text-primary-foreground/50 italic">{t.skillsPage.practiceTitle2}</span>
          </h2>
          <Link
            href="/projects"
            className="bg-background text-foreground px-12 py-5 rounded-full font-jakarta font-bold hover:bg-muted transition-all inline-flex items-center gap-4 text-[14px] uppercase tracking-widest hover:scale-105 active:scale-95 shadow-xl"
          >
            {t.skillsPage.myWork} <ChevronRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </Section>
      </div>
    </div>
  )
}

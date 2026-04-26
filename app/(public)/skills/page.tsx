import React from "react"
import { Layout, Server, Database, Wrench, Cpu, ChevronRight } from "lucide-react"
import Section from "@/components/public/Section"
import Link from "next/link"
import { cookies } from 'next/headers'

const getIcon = (cat: string) => {
  switch(cat) {
    case "Frontend": return Layout
    case "Backend": return Server
    case "DevOps": return Wrench
    case "Design": return Cpu
    default: return Database
  }
}

export const dynamic = 'force-dynamic'

export default async function SkillsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('app-language')?.value as 'fr' | 'en') || 'fr';
  
  // Imports dynamiques
  const { translations } = await import('@/lib/translations')
  const { prisma } = await import("@/lib/prisma")
  
  const t = translations[locale];

  let skillsData = []
  try {
    skillsData = await prisma.skill.findMany({
      orderBy: { order: 'asc' }
    })
  } catch (error) {
    console.error("Failed to fetch skills from database:", error)
  }

  const categories = ["Frontend", "Backend", "DevOps", "Design"]

  return (
    <div className="bg-background min-h-screen">
      <Section className="pt-[140px] pb-[72px] md:pt-[180px] md:pb-[100px]">
        <div className="max-w-6xl mx-auto px-6">
          <span className="pill-tag mb-6">
            {t.skillsPage.expertise}
          </span>
          <h1 className="mb-8 text-foreground">
            {t.skillsPage.title1} <span className="text-foreground/50">{t.skillsPage.title2}</span>
          </h1>
          <p className="font-body text-[18px] text-foreground/70 leading-relaxed max-w-2xl">
            {t.skillsPage.description}
          </p>
        </div>
      </Section>

      <Section className="pb-[120px] pt-0">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:pb-12">
            {categories.map((cat, index) => {
              const Icon = getIcon(cat)
              const catSkills = skillsData.filter((s: any) => s.category === cat)
              
              if (catSkills.length === 0) return null

              return (
                <div 
                  key={cat} 
                  className={`bg-card/40 backdrop-blur-md border border-border hover:border-primary/30 rounded-[32px] p-8 md:p-12 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 overflow-hidden relative group ${index % 2 !== 0 ? "md:translate-y-12" : ""}`}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mx-32 -my-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-5 mb-10">
                      <div className="w-14 h-14 bg-background rounded-2xl flex items-center justify-center text-foreground shadow-sm group-hover:scale-110 transition-transform duration-500 border border-border overflow-hidden relative">
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Icon size={24} strokeWidth={1.5} className="group-hover:text-primary transition-colors relative z-10" />
                      </div>
                      <h2 className="text-3xl font-serif text-foreground">{cat}</h2>
                    </div>

                    <div className="flex flex-col gap-8">
                      {catSkills.map((skill: any) => (
                        <div key={skill.id} className="group/skill">
                          <div className="flex justify-between items-end mb-3">
                            <span className="font-jakarta text-[15px] font-bold text-foreground/80 group-hover/skill:text-foreground transition-colors flex items-center gap-2">
                               {skill.name}
                            </span>
                            <span className="font-jakarta text-[13px] font-bold text-foreground/40 group-hover/skill:text-primary transition-colors">{skill.level}%</span>
                          </div>
                          <div className="h-2.5 w-full bg-foreground/5 rounded-full overflow-hidden border border-border/50">
                            <div 
                              className="h-full bg-foreground/20 group-hover/skill:bg-primary transition-colors duration-500 rounded-full relative overflow-hidden" 
                              style={{ width: `${skill.level}%` }}
                            >
                              <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/skill:translate-x-full transition-transform duration-1000 ease-in-out" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {skillsData.length === 0 && (
            <div className="py-20 text-center bg-card border border-dashed border-border rounded-3xl mt-8">
              <p className="font-body text-foreground/40">{t.skillsPage.noSkills}</p>
            </div>
          )}
        </div>
      </Section>

      <Section className="bg-primary text-primary-foreground rounded-[40px] mx-4 md:mx-10 mb-10 overflow-hidden text-center py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-primary-foreground mb-10">
            {t.skillsPage.practiceTitle1} <br /> <span className="text-primary-foreground/60 italic">{t.skillsPage.practiceTitle2}</span>
          </h2>
          <Link href="/projects" className="bg-background text-foreground px-12 py-5 rounded-full font-jakarta font-bold hover:bg-muted transition-all inline-flex items-center gap-4 text-[16px] uppercase tracking-widest hover:scale-105 active:scale-95 shadow-xl">
            {t.skillsPage.myWork} <ChevronRight size={20} strokeWidth={2.5} />
          </Link>
        </div>
      </Section>
    </div>
  )
}

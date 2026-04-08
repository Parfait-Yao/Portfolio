import React from "react"
import { prisma } from "@/lib/prisma"
import { Layout, Server, Database, Wrench, Cpu, CheckCircle2, ChevronRight } from "lucide-react"
import Section from "@/components/public/Section"
import Link from "next/link"
import { cookies } from 'next/headers'
import { translations } from '@/lib/translations'

const getIcon = (cat: string) => {
  switch(cat) {
    case "Frontend": return Layout
    case "Backend": return Server
    case "DevOps": return Wrench
    case "Design": return Cpu
    default: return Database
  }
}

export default async function SkillsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('app-language')?.value as 'fr' | 'en') || 'fr';
  const t = translations[locale];

  const skillsData = await prisma.skill.findMany({
    orderBy: { order: 'asc' }
  })

  const categories = ["Frontend", "Backend", "DevOps", "Design"]

  return (
    <div className="bg-background min-h-screen">
      {/* Header Section */}
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

      {/* Skills Grid */}
      <Section className="pb-[120px] pt-0">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-3xl overflow-hidden">
            {categories.map((cat) => {
              const Icon = getIcon(cat)
              const catSkills = skillsData.filter((s: any) => s.category === cat)
              
              if (catSkills.length === 0) return null

              return (
                <div 
                  key={cat} 
                  className="bg-card p-12 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-foreground/5 rounded-xl flex items-center justify-center text-foreground">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-3xl font-serif text-foreground">{cat}</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                    {catSkills.map((skill) => (
                      <div key={skill.id} className="group">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-jakarta text-[14px] font-bold text-foreground flex items-center gap-2">
                             {skill.name}
                          </span>
                          <span className="font-jakarta text-[11px] font-bold text-foreground/20">{skill.level}%</span>
                        </div>
                        <div className="h-[1.5px] w-full bg-foreground/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-1000" 
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          
          {skillsData.length === 0 && (
            <div className="py-20 text-center bg-card border border-dashed border-border rounded-3xl">
              <p className="font-body text-foreground/40">{t.skillsPage.noSkills}</p>
            </div>
          )}
        </div>
      </Section>

      {/* Projects CTA */}
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

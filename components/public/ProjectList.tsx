"use client"
import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProjectCard from "./ProjectCard"
import { ChevronDown, LayoutGrid, Rows } from "lucide-react"

/* ── Collect unique tags across all projects ── */
function collectTags(projects: any[]): string[] {
  const set = new Set<string>()
  projects.forEach(p => (p.tags || []).forEach((t: string) => set.add(t)))
  return Array.from(set).slice(0, 8)
}

type Layout = "grid" | "list"

export default function ProjectList({ initialProjects }: { initialProjects: any[] }) {
  const [visibleCount, setVisibleCount] = useState(6)
  const [activeTag,    setActiveTag]    = useState<string | null>(null)
  const [layout,       setLayout]       = useState<Layout>("grid")

  const allTags = useMemo(() => collectTags(initialProjects), [initialProjects])

  const filtered = useMemo(
    () => activeTag
      ? initialProjects.filter(p => (p.tags || []).includes(activeTag))
      : initialProjects,
    [initialProjects, activeTag]
  )

  const visible = filtered.slice(0, visibleCount)

  return (
    <div className="space-y-10">

      {/* ── Toolbar: filters + layout toggle ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { setActiveTag(null); setVisibleCount(6) }}
            className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border transition-all duration-200 ${
              !activeTag
                ? "bg-primary text-primary-foreground border-transparent shadow-lg"
                : "bg-card text-foreground/40 border-border hover:border-foreground/20 hover:text-foreground/60"
            }`}
          >
            Tous
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => { setActiveTag(tag === activeTag ? null : tag); setVisibleCount(6) }}
              className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border transition-all duration-200 ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground border-transparent shadow-lg"
                  : "bg-card text-foreground/40 border-border hover:border-foreground/20 hover:text-foreground/60"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Layout toggle */}
        <div className="flex items-center gap-1 p-1 bg-muted/60 border border-border rounded-xl">
          {([["grid", LayoutGrid], ["list", Rows]] as [Layout, any][]).map(([mode, Icon]) => (
            <button
              key={mode}
              onClick={() => setLayout(mode)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                layout === mode
                  ? "bg-card shadow-sm text-foreground border border-border/60"
                  : "text-foreground/30 hover:text-foreground/60"
              }`}
            >
              <Icon size={14} />
            </button>
          ))}
        </div>
      </div>

      {/* ── Count ── */}
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-foreground/25">
          {filtered.length} projet{filtered.length !== 1 ? "s" : ""}
          {activeTag && <span className="text-foreground/40"> · {activeTag}</span>}
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* ── Project grid / list ── */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-28 text-center bg-card border border-dashed border-border rounded-3xl"
          >
            <p className="text-foreground/30 text-sm">Aucun projet pour ce filtre.</p>
          </motion.div>
        ) : layout === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
              {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        ) : (
          /* ── LIST LAYOUT ── */
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4"
          >
            {visible.map((project, i) => (
              <ProjectListRow key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Load more ── */}
      {filtered.length > visibleCount && (
        <div className="flex justify-center mt-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setVisibleCount(v => v + 6)}
            className="flex items-center gap-2 px-8 py-3.5 bg-card border border-border rounded-full text-[11px] font-extrabold uppercase tracking-widest text-foreground/40 hover:text-foreground hover:border-foreground/20 transition-all shadow-sm"
          >
            Voir plus <ChevronDown size={14} />
          </motion.button>
        </div>
      )}
    </div>
  )
}

/* ── List row variant ── */
function ProjectListRow({ project, index }: { project: any; index: number }) {
  const image = project.imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop"

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative bg-card border border-border rounded-2xl p-4 flex items-center gap-5 hover:border-primary/20 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.45)] transition-all duration-300 overflow-hidden"
    >
      {/* Top accent on hover */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Thumbnail */}
      <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-muted border border-border/50">
        <img src={image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-[15px] font-bold text-foreground leading-tight truncate group-hover:text-primary transition-colors">{project.title}</h3>
          {project.featured && <span className="text-amber-400 shrink-0">★</span>}
        </div>
        <p className="text-[12px] text-foreground/40 leading-relaxed line-clamp-1 mb-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {(project.tags || []).slice(0, 4).map((tag: string, i: number) => (
            <span key={i} className="text-[9px] font-bold uppercase tracking-wider text-primary/50 bg-primary/6 px-2 py-0.5 rounded-full border border-primary/10">{tag}</span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="w-8 h-8 rounded-xl bg-muted border border-border flex items-center justify-center text-foreground/40 hover:bg-primary hover:text-white hover:border-primary transition-all">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        )}
        <motion.div whileHover={{ x: 2 }}>
          <a href={`/projects/${project.id}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-[10px] font-extrabold uppercase tracking-widest hover:opacity-90 transition-opacity">
            Voir
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
}

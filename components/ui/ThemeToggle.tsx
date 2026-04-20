"use client"

import * as React from "react"
import { Moon, Sun, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/Button"
import { useColor, THEME_COLORS, ThemeColor } from "@/components/ColorProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { color, setColor } = useColor()
  const [mounted, setMounted] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown when clicking outside
  React.useEffect(() => {
    if (!open) return

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    // Use a small delay so the opening click doesn't immediately close it
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside)
    }, 0)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full opacity-0">
        <div className="w-4 h-4" />
      </Button>
    )
  }

  // Define display colors for the toggle selection circles
  const getDisplayColor = (c: ThemeColor) => {
    if (c === 'default') return theme === 'dark' ? '#FFFFFF' : '#000000';
    return THEME_COLORS[c].hex;
  }

  return (
    <div className="relative" ref={containerRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        className={`w-10 h-10 rounded-full transition-all ${open ? 'bg-primary text-primary-foreground' : 'bg-pill hover:bg-foreground/10 text-foreground'}`}
      >
        <Palette className="w-[1.2rem] h-[1.2rem]" />
        <span className="sr-only">Changer le thème et la couleur</span>
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 p-4 bg-card border border-border shadow-2xl rounded-2xl w-64 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200 z-[9999] origin-top-right">
          
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50 px-1">Apparence</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme('light')}
                className={`flex-1 rounded-xl text-xs h-9 ${theme === 'light' ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground' : 'border-border'}`}
              >
                <Sun className="w-3.5 h-3.5 mr-1.5" /> Clair
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme('dark')}
                className={`flex-1 rounded-xl text-xs h-9 ${theme === 'dark' ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground' : 'border-border'}`}
              >
                <Moon className="w-3.5 h-3.5 mr-1.5" /> Sombre
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50 px-1">Couleur d'accent</span>
            <div className="grid grid-cols-4 gap-3">
              {(Object.keys(THEME_COLORS) as ThemeColor[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`relative w-full aspect-square rounded-full flex items-center justify-center transition-all ${color === c ? 'ring-2 ring-offset-2 ring-offset-card ring-primary scale-110' : 'hover:scale-110 ring-1 ring-border/50 shadow-sm'}`}
                  style={{ backgroundColor: getDisplayColor(c) || 'var(--foreground)' }}
                  title={THEME_COLORS[c].name}
                />
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

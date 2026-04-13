import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color?: string
  progress: number
  description?: string
}

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  progress,
  description
}: StatCardProps) {
  return (
    <div className="bg-card rounded-2xl p-8 border border-border group transition-all hover:border-primary hover:bg-muted/30">
      <div className="flex items-start justify-between mb-8">
        <div className="w-12 h-12 bg-muted border border-border rounded-full flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
          <Icon size={20} strokeWidth={1.5} />
        </div>
        <div className="text-right">
          <p className="font-body text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">{title}</p>
          <h3 className="font-display text-[clamp(24px,4vw,32px)] leading-tight text-foreground">{value}</h3>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between font-body text-[11px] font-bold tracking-widest uppercase">
          <span className="text-muted-foreground">{description || "Statistique Archive"}</span>
          <span className="text-foreground">{progress}%</span>
        </div>
        <div className="w-full h-[3px] bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

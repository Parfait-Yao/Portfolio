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
    <div className="bg-white rounded-2xl p-8 border border-[#E8E8E4] group transition-all hover:border-[#0A0A0A] hover:bg-[#F7F7F5]/30">
      <div className="flex items-start justify-between mb-8">
        <div className="w-12 h-12 bg-[#F7F7F5] border border-[#E8E8E4] rounded-full flex items-center justify-center text-[#0A0A0A] group-hover:bg-[#0A0A0A] group-hover:text-white transition-all">
          <Icon size={20} strokeWidth={1.5} />
        </div>
        <div className="text-right">
          <p className="font-body text-[11px] font-bold text-[#888888] uppercase tracking-[0.2em] mb-1">{title}</p>
          <h3 className="font-display text-[clamp(24px,4vw,32px)] leading-tight text-[#0A0A0A]">{value}</h3>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between font-body text-[11px] font-bold tracking-widest uppercase">
          <span className="text-[#888888]">{description || "Statistique Archive"}</span>
          <span className="text-[#0A0A0A]">{progress}%</span>
        </div>
        <div className="w-full h-[3px] bg-[#F7F7F5] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#0A0A0A] rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

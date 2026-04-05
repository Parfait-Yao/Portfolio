import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
}

const ProgressCircle = React.forwardRef<HTMLDivElement, ProgressCircleProps>(
  ({ value, size = 100, strokeWidth = 8, className, ...props }, ref) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (value / 100) * circumference

    return (
      <div
        ref={ref}
        className={cn("relative flex items-center justify-center", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-100"
          />
          {/* Foreground circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset: offset,
              transition: "stroke-dashoffset 0.5s ease-in-out",
            }}
            className="text-primary"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-sm font-bold text-slate-800">
          {Math.round(value)}%
        </span>
      </div>
    )
  }
)
ProgressCircle.displayName = "ProgressCircle"

export { ProgressCircle }

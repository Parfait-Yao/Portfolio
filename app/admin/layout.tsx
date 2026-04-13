import React from "react"

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted selection:bg-primary selection:text-primary-foreground">
      {children}
    </div>
  )
}

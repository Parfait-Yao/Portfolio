import React from "react"

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F7F7F5] selection:bg-[#0A0A0A] selection:text-white">
      {children}
    </div>
  )
}

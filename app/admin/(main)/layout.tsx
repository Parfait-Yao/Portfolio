import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminHeader from "@/components/admin/AdminHeader"
import AdminBottomNav from "@/components/admin/AdminBottomNav"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Authentication is handled via global middleware.ts
  // Removing redundant check to avoid redirect loops on /admin/login

  return (
    <div className="flex min-h-screen bg-white font-body selection:bg-[#0A0A0A] selection:text-white">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[280px] flex flex-col min-h-screen relative">
        <AdminHeader title="Administration" />
        <main className="p-6 md:p-12 flex-1 pb-32 lg:pb-12">
          {children}
        </main>
        
        {/* Mobile Nav */}
        <div className="lg:hidden">
          <AdminBottomNav />
        </div>
      </div>
    </div>
  )
}

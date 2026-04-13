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
    <div className="flex min-h-screen bg-card font-body selection:bg-primary selection:text-primary-foreground">
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

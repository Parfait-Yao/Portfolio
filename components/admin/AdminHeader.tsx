"use client"
import React from "react"
import { Bell, Menu, Search } from "lucide-react"

export default function AdminHeader({ title }: { title: string }) {
  return (
    <header className="h-[100px] border-b border-[#E8E8E4] bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <button className="lg:hidden text-[#0A0A0A] hover:bg-[#F7F7F5] p-2 rounded-lg transition-colors">
          <Menu size={24} />
        </button>
        <h1 className="font-display text-3xl text-[#0A0A0A] tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        {/* Simple Search - Optional */}
        <div className="hidden md:flex items-center gap-3 px-4 py-2.5 bg-[#F7F7F5] rounded-full border border-[#E8E8E4] w-48 focus-within:w-64 focus-within:border-[#0A0A0A] transition-all group">
          <Search size={16} className="text-[#888888] group-focus-within:text-[#0A0A0A]" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="bg-transparent border-none focus:ring-0 text-[13px] placeholder:text-[#888888] text-[#0A0A0A] w-full font-body"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-full hover:bg-[#F7F7F5] text-[#888888] hover:text-[#0A0A0A] transition-all border border-transparent hover:border-[#E8E8E4]">
          <Bell size={20} strokeWidth={1.5} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#0A0A0A] rounded-full border-2 border-white"></span>
        </button>

        {/* User status */}
        <div className="flex items-center gap-4 pl-4 md:pl-8 border-l border-[#E8E8E4]">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="font-body text-[14px] font-bold text-[#0A0A0A]">Parfait Eric</span>
            <span className="font-body text-[10px] text-[#888888] font-bold uppercase tracking-widest">En ligne</span>
          </div>
          <div className="w-10 h-10 bg-[#F7F7F5] border border-[#E8E8E4] rounded-full flex items-center justify-center font-display text-[#0A0A0A] text-lg">
            PE
          </div>
        </div>
      </div>
    </header>
  )
}

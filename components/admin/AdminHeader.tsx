"use client"
import React from "react"
import { Bell, Menu, Search } from "lucide-react"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export default function AdminHeader({ title }: { title: string }) {
  return (
    <header className="h-[100px] border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-40 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <button className="lg:hidden text-foreground hover:bg-muted p-2 rounded-lg transition-colors">
          <Menu size={24} />
        </button>
        <h1 className="font-display text-3xl text-foreground tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        {/* Simple Search - Optional */}
        <div className="hidden md:flex items-center gap-3 px-4 py-2.5 bg-muted rounded-full border border-border w-48 focus-within:w-64 focus-within:border-primary transition-all group">
          <Search size={16} className="text-muted-foreground group-focus-within:text-foreground" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="bg-transparent border-none focus:ring-0 text-[13px] placeholder:text-muted-foreground text-foreground w-full font-body"
          />
        </div>

        {/* Theme & Color Switcher */}
        <ThemeToggle />

        {/* Notifications */}
        <button className="relative p-2.5 rounded-full hover:bg-pill text-foreground/50 hover:text-foreground transition-all border border-transparent hover:border-border">
          <Bell size={20} strokeWidth={1.5} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
        </button>

        {/* User status */}
        <div className="flex items-center gap-4 pl-4 md:pl-8 border-l border-border">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="font-body text-[14px] font-bold text-foreground">Parfait Eric</span>
            <span className="font-body text-[10px] text-muted-foreground font-bold uppercase tracking-widest">En ligne</span>
          </div>
          <div className="w-10 h-10 bg-muted border border-border rounded-full flex items-center justify-center font-display text-foreground text-lg">
            PE
          </div>
        </div>
      </div>
    </header>
  )
}

"use client"
import React, { useEffect, useState } from "react"
import { 
  Mail, 
  Trash2, 
  Eye, 
  Search, 
  CheckCircle2, 
  Clock,
  User,
  ArrowRight,
  Filter,
  X
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedMsg, setSelectedMsg] = useState<any>(null)

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/messages")
      if (res.ok) {
        const data = await res.json()
        setMessages(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      toast.error("Erreur de chargement")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}`, { 
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true })
      })
      if (res.ok) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
      }
    } catch {}
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce message définitivement ?")) return
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Message archivé")
        fetchMessages()
      }
    } catch {
      toast.error("Échec de l'opération")
    }
  }

  const filtered = messages.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.subject.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-12 pb-32 lg:pb-12">
      {/* Header section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-[#EFEFEB] text-[#3D3D3A] px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase mb-4">
            Messagerie
          </span>
          <h1 className="font-display text-[clamp(32px,5vw,48px)] leading-[1.1] text-[#0A0A0A] mb-4">
            Flux de <span className="text-[#888888]">Communication.</span>
          </h1>
          <p className="font-body text-[15px] text-[#6B6B6B] max-w-xl">
            Suivez vos interactions clients et gérez vos opportunités entrantes d'un coup d'œil.
          </p>
        </div>
      </section>

      {/* Main Inbox Table */}
      <div className="bg-white rounded-2xl border border-[#E8E8E4] overflow-hidden">
        {/* Filters bar */}
        <div className="p-6 md:p-8 bg-[#F7F7F5]/50 border-b border-[#E8E8E4] flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888888]" />
            <input 
              type="text" 
              placeholder="Chercher un expéditeur ou sujet..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 h-12 bg-white border border-[#E8E8E4] rounded-full text-[14px] font-body focus:outline-none focus:border-[#0A0A0A] transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 font-body text-[12px] font-bold text-[#888888] uppercase tracking-widest">
            <Filter size={14} /> <span className="text-[#0A0A0A]">{filtered.length}</span> Messages
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E8E4]">
                <th className="py-5 px-8 font-body text-[11px] font-bold text-[#888888] uppercase tracking-widest">Expéditeur</th>
                <th className="py-5 px-8 font-body text-[11px] font-bold text-[#888888] uppercase tracking-widest hidden md:table-cell">Sujet</th>
                <th className="py-5 px-8 font-body text-[11px] font-bold text-[#888888] uppercase tracking-widest">Statut</th>
                <th className="py-5 px-8 font-body text-[11px] font-bold text-[#888888] uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E4]">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={4} className="px-8 py-10 h-20 bg-[#F7F7F5]/30"></td>
                  </tr>
                ))
              ) : filtered.length > 0 ? (
                filtered.map((msg) => (
                  <tr key={msg.id} className={cn("group hover:bg-[#F7F7F5] transition-colors", !msg.read && "bg-[#F7F7F5]/80")}>
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white border border-[#E8E8E4] rounded-full flex items-center justify-center font-display text-[#0A0A0A] text-sm grayscale group-hover:grayscale-0 transition-all">
                          {msg.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className={cn("font-body text-[15px] font-bold", !msg.read ? "text-[#0A0A0A]" : "text-[#6B6B6B]")}>{msg.name}</span>
                          <span className="font-body text-[11px] text-[#888888] uppercase tracking-widest mt-0.5">{msg.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-8 hidden md:table-cell">
                      <div className="flex flex-col">
                        <span className={cn("font-body text-[14px] truncate max-w-[300px]", !msg.read ? "text-[#0A0A0A] font-bold" : "text-[#888888]")}>{msg.subject}</span>
                        <span className="font-body text-[10px] text-[#B0B0B0] font-bold uppercase tracking-widest mt-0.5">{new Date(msg.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      {!msg.read ? (
                        <div className="inline-flex items-center gap-1.5 text-[#0A0A0A] font-bold text-[10px] uppercase tracking-widest bg-white border border-[#0A0A0A] px-2 py-1 rounded">
                          Nouveau
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-[#888888] text-[10px] font-bold uppercase tracking-widest">
                          <CheckCircle2 size={12} className="text-[#888888]" /> Lu
                        </div>
                      )}
                    </td>
                    <td className="py-6 px-8 text-right">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => { setSelectedMsg(msg); markAsRead(msg.id) }}
                          className="w-10 h-10 rounded-full bg-white border border-[#E8E8E4] flex items-center justify-center text-[#888888] hover:text-[#0A0A0A] hover:border-[#0A0A0A] transition-all"
                          title="Détails"
                        >
                          <Eye size={16} strokeWidth={1.5} />
                        </button>
                        <button 
                          onClick={() => handleDelete(msg.id)}
                          className="w-10 h-10 rounded-full bg-white border border-[#E8E8E4] flex items-center justify-center text-[#888888] hover:text-red-600 hover:border-red-600 transition-all"
                          title="Supprimer"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center font-body text-[#888888]">
                    La boîte de réception est actuellement vide.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Detail Panel */}
      {selectedMsg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/20 backdrop-blur-md">
          <div className="bg-white border border-[#E8E8E4] rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="h-[80px] border-b border-[#E8E8E4] px-8 flex items-center justify-between bg-[#F7F7F5]/30">
               <div className="flex items-center gap-3">
                 <Mail size={18} className="text-[#0A0A0A]" />
                 <h2 className="font-display text-xl text-[#0A0A0A]">Message Entrant</h2>
               </div>
               <button onClick={() => setSelectedMsg(null)} className="w-10 h-10 rounded-full hover:bg-[#F7F7F5] flex items-center justify-center text-[#888888] hover:text-[#0A0A0A] transition-colors">
                 <X size={20} />
               </button>
            </div>

            <div className="p-8 md:p-12 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#E8E8E4]">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 bg-[#F7F7F5] border border-[#E8E8E4] rounded-full flex items-center justify-center font-display text-[#0A0A0A] text-2xl">
                     {selectedMsg.name.charAt(0)}
                   </div>
                   <div>
                     <p className="font-body text-[18px] font-bold text-[#0A0A0A]">{selectedMsg.name}</p>
                     <p className="font-body text-[13px] text-[#888888] tracking-wide">{selectedMsg.email}</p>
                   </div>
                </div>
                <div className="text-left md:text-right">
                  <p className="font-body text-[11px] font-bold text-[#B0B0B0] uppercase tracking-widest mb-1">Reçu le</p>
                  <p className="font-body text-[13px] font-bold text-[#0A0A0A]">{new Date(selectedMsg.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="space-y-4">
                <span className="font-body text-[11px] font-bold text-[#888888] uppercase tracking-[0.2em]">Objet du message</span>
                <h3 className="font-display text-3xl text-[#0A0A0A] tracking-tight">{selectedMsg.subject}</h3>
              </div>

              <div className="bg-[#F7F7F5] border border-[#E8E8E4] rounded-2xl p-8 md:p-10">
                <p className="font-body text-[16px] text-[#2D2D2D] leading-relaxed whitespace-pre-wrap">
                  {selectedMsg.body}
                </p>
              </div>
            </div>

            <div className="p-8 border-t border-[#E8E8E4] flex flex-col md:flex-row gap-4 items-center justify-between bg-[#F7F7F5]/30">
              <button 
                onClick={() => setSelectedMsg(null)}
                className="font-body text-[13px] font-bold text-[#888888] hover:text-[#0A0A0A] uppercase tracking-widest transition-colors"
              >
                Fermer l'aperçu
              </button>
              <a 
                href={`mailto:${selectedMsg.email}?subject=Re: ${selectedMsg.subject}`}
                className="bg-[#0A0A0A] text-white px-10 py-4 rounded-full font-body font-bold text-[13px] uppercase tracking-widest hover:bg-[#333] transition-colors flex items-center gap-2 w-full md:w-auto justify-center"
              >
                Répondre directement <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

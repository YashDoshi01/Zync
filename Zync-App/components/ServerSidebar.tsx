"use client"
import { Spacer } from "@heroui/spacer"
import { MessageCircle, Plus } from "lucide-react"
import ProfileWidget from "./ProfileWidget"

export default function ServersSidebar() {
  return (
    <aside className="w-[72px] bg-[#0a0a0b] flex flex-col items-center py-4 gap-3 border-r border-[#1a1a1c]">
      <button className="group w-12 h-12 bg-[#7289da] rounded-3xl hover:rounded-2xl transition-all duration-300 flex items-center justify-center">
        <MessageCircle className="h-5 w-5 text-white group-hover:scale-110" />
      </button>

      <Spacer className="my-2 w-8 bg-[#1a1a1c]" />

      {["S1", "S2", "S3", "S4", "S5"].map((s) => (
        <div
          key={s}
          className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-sm font-semibold"
        >
          {s}
        </div>
      ))}

      <button className="group w-12 h-12 bg-[#1a1a1c] rounded-3xl hover:rounded-2xl hover:bg-[#23a559] transition-all duration-300 flex items-center justify-center mt-2">
        <Plus className="h-5 w-5 text-[#23a559] group-hover:text-white" />
      </button>
      
      <button>
        <ProfileWidget
          username="ash_ketchum"
          avatarUrl="https://i.pravatar.cc/300"
        />
        </button>
    </aside>
  )
}

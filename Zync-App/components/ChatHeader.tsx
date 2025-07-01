
"use client"
import { Hash, Settings } from "lucide-react"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"

export default function ChatHeader() {
  return (
    <header className="h-12 flex items-center px-4 border-b border-[#1a1a1c] gap-4 bg-[#141417]">
      <div className="flex items-center gap-2">
        <Hash className="h-4 w-4 text-[#7289da]" />
        <span className="text-base font-semibold">general</span>
      </div>
      <span className="text-sm text-gray-400 hidden sm:inline">Welcome to the general chat!</span>
      <div className="ml-auto flex items-center gap-3">
        <div className="relative">
          <Input placeholder="Search" className="w-40 border-none text-sm text-white pl-3 pr-8 rounded-md" />
        </div>
        <Button variant="ghost" size="sm" className="hover:bg-[#1e1e22] rounded-md">
          <Settings className="h-4 w-4 text-gray-400 hover:text-[#7289da]" />
        </Button>
      </div>
    </header>
  )
}

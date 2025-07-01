"use client"
import { Button } from "@heroui/button"
import { Smile } from "lucide-react"
import { ScrollShadow } from "@heroui/scroll-shadow"

export default function MessageList() {
  return (
    <ScrollShadow className="flex-1 p-4 space-y-5">
      {[1, 2, 3, 4, 5].map((msg) => (
        <div key={msg} className="flex gap-3 items-start group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7289da] to-[#5d73c7] flex items-center justify-center text-sm font-semibold shadow-lg">
            U{msg}
          </div>
          <div className="flex-1">
            <div className="flex gap-2 items-center text-sm">
              <span className="font-semibold">User {msg}</span>
              <span className="text-xs text-gray-400">Today at 12:00</span>
            </div>
            <p className="text-sm text-gray-300">This is a sample message in the chat.</p>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" className="h-7 w-7 rounded-md hover:bg-[#1e1e22]">
              <Smile className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>
      ))}
    </ScrollShadow>
  )
}

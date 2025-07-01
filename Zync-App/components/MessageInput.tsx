"use client"
import { Input } from "@heroui/input"
import { PlusCircle, Smile, Send, ImageIcon } from "lucide-react"
import { useState, useRef } from "react"

export default function MessageInput() {
  const [message, setMessage] = useState("")
  const inputRef = useRef(null)

  const handleSend = () => {
    if (!message.trim()) return
    console.log("Sending message:", message)
    setMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <footer className="p-4 bg-[#141417]">
      <div className="relative">
        <div className="absolute left-4 bottom-3">
          <PlusCircle className="h-5 w-5 text-gray-400 hover:text-[#7289da] cursor-pointer transition-colors" />
        </div>
        <Input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message #general"
          className="w-full bg-[#0f0f10] border-none pl-12 pr-36 py-4 text-white rounded-md"
        />
        <div className="absolute right-4 bottom-5 flex gap-3 items-center">
          {[ImageIcon, Smile].map((Icon, i) => (
            <Icon key={i} className="h-5 w-5 text-gray-400 hover:text-[#7289da] cursor-pointer transition-colors" />
          ))}
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`ml-2 p-1.5 rounded-md transition-colors ${
              message.trim()
                ? "bg-[#7289da] hover:bg-[#5d73c7] text-white"
                : "bg-[#2a2a2d] text-gray-500 cursor-not-allowed"
            }`}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}

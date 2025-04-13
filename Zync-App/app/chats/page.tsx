"use client"

import { Button } from "@heroui/button"
import { ScrollShadow } from "@heroui/scroll-shadow"
import { Input } from "@heroui/input"
import { Spacer } from "@heroui/spacer"
import {
  Hash,
  Plus,
  Settings,
  Users,
  MessageCircle,
  Video,
  Phone,
  Search,
  Headphones,
  AtSign,
  Smile,
  PlusCircle,
  GiftIcon as GIF,
  ImageIcon,
} from "lucide-react"
import { Send } from "lucide-react"
import { useState, useRef } from "react"

export default function ChatPage() {
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
    <div className="flex h-screen bg-[#0f0f10] text-white">
      {/* Servers Sidebar */}
      <aside className="w-[72px] bg-[#0a0a0b] flex flex-col items-center py-4 gap-3 border-r border-[#1a1a1c]">
      <button className="group w-12 h-12 bg-[#7289da] rounded-3xl hover:rounded-2xl transition-all duration-300 flex items-center justify-center relative overflow-hidden">
        <MessageCircle className="h-5 w-5 text-white transition-all duration-200 group-hover:scale-110" />
        <span className="sr-only">Home</span>
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
    <Plus className="h-5 w-5 text-[#23a559] group-hover:text-white transition-colors duration-200" />
    <span className="sr-only">Create Server</span>
      </button>
      </aside>

           {/* Channels Sidebar */}
           <aside className="w-60 bg-[#141417] border-r border-[#1a1a1c]">
        <div className="p-4 border-b border-[#1a1a1c]">
          <h2 className="text-lg font-bold bg-gradient-to-r from-[#7289da] to-[#5d73c7] bg-clip-text text-transparent">
            Server Name
          </h2>
        </div>
        <ScrollShadow className="h-[calc(100vh-64px)] px-2">
          <div className="space-y-6 py-3">
            <div>
              <div className="flex justify-between items-center mb-2 px-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Text Channels</span>
                <Button className="bg-transparent" size="sm">
                <Plus className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer" />
                </Button>
              </div>
              <div className="space-y-1">
                {["general", "announcements", "off-topic"].map((channel) => (
                  <Button
                    key={channel}
                    variant="ghost"
                    className="w-full justify-start px-2 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-[#1e1e22] rounded-md gap-2 transition-colors"
                  >
                    <Hash className="h-4 w-4" />
                    {channel}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 px-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Voice Channels</span>
                <Button className="bg-transparent" size="sm">
                <Plus className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer" />
                </Button>
              </div>
              <div className="space-y-1">
                {["General VC", "Gaming", "Music"].map((channel) => (
                  <Button
                    key={channel}
                    variant="ghost"
                    className="w-full justify-start px-2 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-[#1e1e22] rounded-md gap-2 transition-colors"
                  >
                    <Headphones className="h-4 w-4" />
                    {channel}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </ScrollShadow>
      </aside>


      {/* Chat Area */}
      <main className="flex-1 flex flex-col bg-[#18181b]">
        <header className="h-12 flex items-center px-4 border-b border-[#1a1a1c] gap-4 bg-[#141417]">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-[#7289da]" />
            <span className="text-base font-semibold">general</span>
          </div>
          <span className="text-sm text-gray-400 hidden sm:inline">Welcome to the general chat!</span>
          <div className="ml-auto flex items-center gap-3">
            
            <div className="relative">
              <Input
                placeholder="Search"
                className="w-40 border-none text-sm text-white pl-3 pr-8 rounded-md"
              />
              {/* <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/> */}
            </div>
           
              <Button  variant="ghost" size="sm" className="hover:bg-[#1e1e22] rounded-md">
                <Settings className="h-4 w-4 text-gray-400 hover:text-[#7289da]" />
              </Button>
            
          </div>
        </header>

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

        {/* Right icons + Send */}
        <div className="absolute right-4 bottom-5 flex gap-3 items-center">
          {[ImageIcon, Smile].map((Icon, i) => (
            <Icon
              key={i}
              className="h-5 w-5 text-gray-400 hover:text-[#7289da] cursor-pointer transition-colors"
            />
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
      </main>
      {/* Members Sidebar */}
      <aside className="w-60 bg-[#141417] border-l border-[#1a1a1c] p-4 space-y-6 hidden md:block">
        <section>
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2 tracking-wider">Online — 3</h3>
          <div className="space-y-2">
            {[1, 2, 3].map((user) => (
              <div key={user} className="flex items-center gap-2 p-2 rounded-md hover:bg-[#1e1e22] transition-colors">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7289da] to-[#5d73c7] flex items-center justify-center text-sm shadow-md">
                    U{user}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#23a559] border-2 border-[#141417] rounded-full" />
                </div>
                <span className="text-sm">User {user}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2 tracking-wider">Offline — 2</h3>
          <div className="space-y-2">
            {[4, 5].map((user) => (
              <div
                key={user}
                className="flex items-center gap-2 opacity-50 p-2 rounded-md hover:bg-[#1e1e22] transition-colors"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-[#2a2a2d] flex items-center justify-center text-sm">
                    U{user}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500 border-2 border-[#141417] rounded-full" />
                </div>
                <span className="text-sm">User {user}</span>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  )
}

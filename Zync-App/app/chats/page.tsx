"use client"

import ServersSidebar from "@/components/ServerSidebar"
import ChannelsSidebar from "@/components/ChannelSidebar"
import ChatHeader from "@/components/ChatHeader"
import ChatMessages from "@/components/MessaageList"
import ChatInput from "@/components/MessageInput"
import MembersSidebar from "@/components/MemberSidebar"
import ProfileWidget from "@/components/ProfileWidget"

export default function ChatPage() {
  return (
    <div className="flex h-screen bg-[#0f0f10] text-white">
      {/* Leftmost Servers Sidebar */}
      <ServersSidebar />

      {/* Channels Sidebar */}
      <div className="flex flex-col w-60 bg-[#141417] border-r border-[#1a1a1c]">
        <ChannelsSidebar />
        
      </div>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-[#18181b]">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </main>

      {/* Members Sidebar */}
      <MembersSidebar />
    </div>
  )
}

"use client"
import { Button } from "@heroui/button"
import { Plus, Hash, Headphones } from "lucide-react"
import { ScrollShadow } from "@heroui/scroll-shadow"
import ProfileWidget from "./ProfileWidget"
export default function ChannelsSidebar() {
  return (
    <aside className =" w-60 bg-[#141417] border-r border-[#1a1a1c] ">
      <div className="p-4 border-b border-[#1a1a1c]">
        <h2 className="text-lg font-bold bg-gradient-to-r from-[#7289da] to-[#5d73c7] bg-clip-text text-transparent">
          Server Name
        </h2>
      </div>
      <ScrollShadow className="h-[calc(100vh-64px)] px-2 py-3 space-y-6">
        {[
          {
            title: "Text Channels",
            icon: Hash,
            items: ["general", "announcements", "off-topic"],
          },
          {
            title: "Voice Channels",
            icon: Headphones,
            items: ["General VC", "Gaming", "Music"],
          },
        ].map((section) => (
          <div key={section.title}>
            <div className="flex justify-between items-center mb-2 px-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{section.title}</span>
              <Button className="bg-transparent" size="sm">
                <Plus className="h-4 w-4 text-gray-400 hover:text-white" />
              </Button>
            </div>
            <div className="space-y-1">
              {section.items.map((channel) => (
                <Button
                  key={channel}
                  variant="ghost"
                  className="w-full justify-start px-2 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-[#1e1e22] rounded-md gap-2"
                >
                  <section.icon className="h-4 w-4" />
                  {channel}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </ScrollShadow>
    </aside>
  )
}

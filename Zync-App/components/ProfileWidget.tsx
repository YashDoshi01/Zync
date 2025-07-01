"use client"

type ProfileWidgetProps = {
  username: string
  avatarUrl: string
}

export default function ProfileWidget({avatarUrl }: ProfileWidgetProps) {
  return (
    <div className="p-3  flex items-center gap-3">
      <div className="relative">
        <img
          src={avatarUrl}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        {/* <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#23a559] border-2 border-[#141417] rounded-full" /> */}
      </div>
      {/* <p className="text-sm font-medium text-white truncate">{username}</p> */}
    </div>
  )
}

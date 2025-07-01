"use client"

export default function MembersSidebar() {
  return (
    <aside className="w-60 bg-[#141417] border-l border-[#1a1a1c] p-4 space-y-6 hidden md:block">
      {[
        { title: "Online", users: [1, 2, 3], status: "#23a559", opacity: "" },
        { title: "Offline", users: [4, 5], status: "gray-500", opacity: "opacity-50" },
      ].map(({ title, users, status, opacity }) => (
        <section key={title}>
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2 tracking-wider">
            {title} — {users.length}
          </h3>
          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user}
                className={`flex items-center gap-2 p-2 rounded-md hover:bg-[#1e1e22] transition-colors ${opacity}`}
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7289da] to-[#5d73c7] flex items-center justify-center text-sm">
                    U{user}
                  </div>
                  <span className={`absolute bottom-0 right-0 w-3 h-3 bg-${status} border-2 border-[#141417] rounded-full`} />
                </div>
                <span className="text-sm">User {user}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </aside>
  )
}

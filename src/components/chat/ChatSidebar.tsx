"use client"

import { Search } from "./Search"
import { Settings } from "./Settings"
import { Users } from "./UsersList"

export const ChatSidebar = () => {
  return (
    <div className="w-2/5 p-5 bg-slate-600 text-white flex flex-col gap-6">
      <Settings />
      <Search />
      <Users />
    </div>
  )
}

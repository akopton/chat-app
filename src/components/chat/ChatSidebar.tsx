"use client"

import { Search } from "./Search"
import { Settings } from "./Settings"
import { Users } from "./UsersList"

export const ChatSidebar = () => {
  return (
    <div className="w-60 bg-slate-600 text-white flex flex-col gap-2">
      <Settings />
      <Search />
      <Users />
    </div>
  )
}

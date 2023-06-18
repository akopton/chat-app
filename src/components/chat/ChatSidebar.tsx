"use client"

import { Search } from "./Search"
import { Settings } from "./Settings"
import { ChatsList } from "./ChatsList"

export const ChatSidebar = () => {
  return (
    <div className="w-72 bg-neutral-900 text-white flex flex-col gap-2">
      <Settings />
      <Search />
      <ChatsList />
    </div>
  )
}

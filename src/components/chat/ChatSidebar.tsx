"use client"

import { Settings } from "./Settings"
import { Users } from "./Users"

export const ChatSidebar = () => {
  return (
    <div className="w-2/5 p-5 bg-slate-600 text-white">
      <Settings />
      <Users />
    </div>
  )
}

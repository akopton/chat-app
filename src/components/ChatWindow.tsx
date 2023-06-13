"use client"

import { ChatSidebar } from "./ChatSidebar"
import { OpenedChat } from "./OpenedChat"

export const ChatWindow = () => {
  return (
    <div className="flex border border-black border-solid h-5/6 w-3/5">
      <ChatSidebar />
      <OpenedChat />
    </div>
  )
}

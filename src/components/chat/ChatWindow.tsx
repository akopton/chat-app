"use client"

import { ChatSidebar } from "./ChatSidebar"
import { OpenedChat } from "./OpenedChat"

export const ChatWindow = () => {
  return (
    <div className="flex border-2 border-black border-solid rounded-xl h-5/6 w-3/5 overflow-hidden">
      <ChatSidebar />
      <OpenedChat />
    </div>
  )
}

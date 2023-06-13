"use client"

import { MessageInput } from "./MessageInput"
import { MessagesWindow } from "./MessagesWindow"

export const OpenedChat = () => {
  return (
    <div className="w-full border-l-2 border-black border-solid p-5 bg-slate-400 relative">
      <MessagesWindow />
      <MessageInput />
    </div>
  )
}

"use client"

import { MessageInput } from "./MessageInput"
import { MessagesWindow } from "./MessagesWindow"

export const OpenedChat = () => {
  return (
    <div className="w-full border-l-2 border-black border-solid px-5 py-2 bg-slate-400 flex flex-col justify-between gap-4">
      <MessagesWindow />
      <MessageInput />
    </div>
  )
}

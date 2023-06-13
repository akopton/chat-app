"use client"

import { MessageInput } from "./MessageInput"
import { MessagesWindow } from "./MessagesWindow"

export const OpenedChat = () => {
  return (
    <div className="border border-blue-500 border-solid w-full">
      <MessagesWindow />
      <MessageInput />
    </div>
  )
}

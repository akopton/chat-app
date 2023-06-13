"use client"

import { Message } from "./Message"

export const MessagesWindow = () => {
  return (
    <div className="flex flex-col gap-1 overflow-y-scroll no-scrollbar">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  )
}

"use client"

import { useRef } from "react"
import { Message } from "./Message"

export const MessagesWindow = ({ messagesWindowRef }: any) => {
  return (
    <div
      className="flex flex-col gap-1 overflow-y-scroll no-scrollbar"
      ref={messagesWindowRef}
    >
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

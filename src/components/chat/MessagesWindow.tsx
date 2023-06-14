"use client"

import { useRef } from "react"
import { Message } from "./Message"

export const MessagesWindow = ({ messagesWindowRef, messages }: any) => {
  return (
    <div
      className="flex flex-col gap-1 overflow-y-scroll no-scrollbar"
      ref={messagesWindowRef}
    >
      {messages.map((m: string, id: number) => {
        return <Message text={m} id={id} key={id} />
      })}
    </div>
  )
}

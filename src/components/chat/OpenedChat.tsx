"use client"

import { useEffect, useRef, useState } from "react"
import { MessageInput } from "./MessageInput"
import { MessagesWindow } from "./MessagesWindow"

export const OpenedChat = () => {
  const [messages, setMessages] = useState<string[]>([])
  const messagesWindowRef = useRef(null)

  return (
    <div className="w-full border-l-2 border-black border-solid px-5 py-2 bg-slate-400 flex flex-col justify-between gap-4">
      <MessagesWindow
        messagesWindowRef={messagesWindowRef}
        messages={messages}
      />
      <MessageInput
        messagesWindowRef={messagesWindowRef}
        setMessages={setMessages}
      />
    </div>
  )
}

"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { MessageInput } from "./MessageInput"
import { MessagesWindow } from "./MessagesWindow"
import { ChatContext } from "@/context/ChatContext"

export const OpenedChat = () => {
  const messagesWindowRef = useRef(null)
  const {
    state: { user },
  } = useContext(ChatContext)

  return (
    <div className="w-full h-full border-l-2 border-black border-solid px-5 py-2 bg-slate-400 flex flex-col gap-4 relative">
      <div className="border-2 border-black border-solid justify-self-start">
        {user?.displayName}
      </div>
      <MessagesWindow messagesWindowRef={messagesWindowRef} />
      <MessageInput messagesWindowRef={messagesWindowRef} />
    </div>
  )
}

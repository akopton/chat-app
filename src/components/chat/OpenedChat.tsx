"use client"

import { useContext, useRef } from "react"
import { MessageInput } from "./MessageInput"
import { MessagesWindow } from "./MessagesWindow"
import { ChatContext } from "@/context/ChatContext"

export const OpenedChat = () => {
  const {
    state,
    state: { user },
  } = useContext(ChatContext)
  const messagesWindowRef = useRef(null)

  return (
    <div className="w-full h-full border-l-2 border-black border-solid px-5 py-2 bg-slate-400 flex flex-col gap-4 relative">
      <div className="justify-self-start flex items-center gap-2">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img alt="" className="object-fill scale-125" src={user?.photoURL} />
        </div>
        <p className="text-white text-xl">{user?.displayName}</p>
      </div>
      <MessagesWindow messagesWindowRef={messagesWindowRef} />
      {state.chatId && <MessageInput messagesWindowRef={messagesWindowRef} />}
    </div>
  )
}

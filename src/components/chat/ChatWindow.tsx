"use client"

import { useContext } from "react"
import { ChatSidebar } from "./ChatSidebar"
import { OpenedChat } from "./OpenedChat"
import { AuthContext } from "@/context/AuthContext"

export const ChatWindow = () => {
  const currentUser = useContext(AuthContext)

  return (
    <div className="flex border-2 border-black border-solid rounded-xl h-5/6 w-3/5 overflow-hidden">
      <ChatSidebar />
      <OpenedChat />
    </div>
  )
}

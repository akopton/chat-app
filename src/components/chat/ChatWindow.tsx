"use client"

import React, { ReactNode, useContext, useEffect, useState } from "react"
import { ChatSidebar } from "./ChatSidebar"
import { OpenedChat } from "./OpenedChat"
import { AuthContext } from "../../context/AuthContext"
import { useRouter } from "next/navigation"
import Link from "next/link"

export const ChatWindow = () => {
  const [showContent, setShowContent] = useState<boolean>(false)
  const currentUser = useContext(AuthContext)
  const router = useRouter()
  return (
    <div className="flex border-2 border-black border-solid rounded-xl h-5/6 w-3/5 overflow-hidden">
      <ChatSidebar />
      <OpenedChat />
    </div>
  )
}

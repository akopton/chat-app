"use client"

import React, { useContext, useEffect, useRef } from "react"
import { ChatSidebar } from "./ChatSidebar"
import { OpenedChat } from "./OpenedChat"
import { AuthContext } from "../../context/AuthContext"
import Link from "next/link"
import { ChatContext, ChatContextProvider } from "@/context/ChatContext"

export const ChatWindow = () => {
  const currentUser = useContext(AuthContext)

  return (
    <>
      {currentUser.uid ? (
        <>
          <div className="flex border-2 border-black border-solid rounded-xl sm:h-5/6 sm:w-3/5 overflow-hidden">
            <ChatSidebar />
            <OpenedChat />
          </div>
        </>
      ) : (
        <Link href="/login">zaloguj się</Link>
      )}
    </>
  )
}

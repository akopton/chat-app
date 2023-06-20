"use client"

import React, { useContext } from "react"
import { ChatSidebar } from "./sidebar/ChatSidebar"
import { OpenedChat } from "./maincontent/OpenedChat"
import { AuthContext } from "../../context/AuthContext"
import Link from "next/link"

export const ChatWindow = () => {
  const currentUser = useContext(AuthContext)

  return (
    <>
      {currentUser.uid ? (
        <>
          <div className="flex border-4 border-teal-500 border-solid rounded-xl sm:h-5/6 sm:w-3/5 overflow-hidden">
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

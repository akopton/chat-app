"use client"

import { AuthContext } from "@/context/AuthContext"
import { ChatContext } from "@/context/ChatContext"
import { useContext, useEffect } from "react"

export const Message = ({ m, id, messagesWindowRef }: any) => {
  const currentUser = useContext(AuthContext)
  const { state } = useContext(ChatContext)

  useEffect(() => {
    messagesWindowRef.current.scrollTop = messagesWindowRef.current.scrollHeight
  }, [])

  return (
    <div
      className={
        "bg-slate-600 text-white p-2 " +
        `${id % 2 === 0 ? "self-start" : "self-end"}`
      }
    >
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img
          src={
            currentUser.photoURL && m.senderId === currentUser.uid
              ? currentUser.photoURL
              : state.user.photoURL
          }
          alt=""
        />
      </div>
      <p>{m.text}</p>
    </div>
  )
}

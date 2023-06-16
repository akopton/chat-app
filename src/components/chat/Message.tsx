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
      className={`flex items-end gap-5 ${
        currentUser.uid === m.senderId ? "self-end" : "self-start"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-full overflow-hidden ${
          currentUser.uid === m.senderId ? "order-2" : ""
        }`}
      >
        <img
          src={
            currentUser.photoURL && m.senderId === currentUser.uid
              ? currentUser.photoURL
              : state.user.photoURL
          }
          alt=""
        />
      </div>
      <div className="bg-slate-600 px-4 py-2 rounded-3xl flex flex-col items-center gap-2 text-white">
        <p>{m.text}</p>
        {m.img && <img src={m.img} alt="" className="h-24 w-24 rounded-3xl" />}
      </div>
    </div>
  )
}

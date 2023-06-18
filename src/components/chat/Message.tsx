"use client"

import { AuthContext } from "@/context/AuthContext"
import { ChatContext } from "@/context/ChatContext"
import { useContext, useEffect } from "react"

export const Message = ({ m, messagesWindowRef }: any) => {
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
        className={` h-10 w-10 border-black  rounded-full overflow-hidden ${
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
          className="min-w-full min-h-full"
        />
      </div>
      <div
        className={`max-w-md px-4 py-2 rounded-3xl flex flex-col items-center gap-2 text-white ${
          currentUser.uid === m.senderId ? "bg-teal-700" : "bg-neutral-800"
        }`}
      >
        <p>{m.text}</p>
        {m.img && <img src={m.img} alt="" className="h-24 w-24 rounded-3xl" />}
      </div>
    </div>
  )
}

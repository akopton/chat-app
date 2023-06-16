"use client"

import { AuthContext } from "@/context/AuthContext"
import { ChatContext } from "@/context/ChatContext"
import { useContext } from "react"

export const Message = ({ m, id }: any) => {
  const currentUser = useContext(AuthContext)
  const { state } = useContext(ChatContext)
  return (
    <div
      className={
        "bg-slate-600 text-white p-2 " +
        `${id % 2 === 0 ? "self-start" : "self-end"}`
      }
    >
      <div className="w-10 h-10 rounded-full overflow-hidden"></div>
      <p>{m.text}</p>
    </div>
  )
}

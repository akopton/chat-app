"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { Message } from "./Message"
import { ChatContext } from "@/context/ChatContext"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/firebase/firebase"

export const MessagesWindow = ({ messagesWindowRef }: any) => {
  const [messages, setMessages] = useState<any>()
  const {
    state: { chatId },
  } = useContext(ChatContext)

  useEffect(() => {
    if (chatId) {
      const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages)
      })

      return () => unsub()
    }
  }, [chatId])

  return (
    <div
      className="flex flex-col gap-1 overflow-y-scroll no-scrollbar"
      ref={messagesWindowRef}
    >
      {messages?.map((m: any) => {
        return <Message m={m} key={m.id} />
      })}
    </div>
  )
}

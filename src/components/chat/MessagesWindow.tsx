"use client"

import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Message } from "./Message"
import { ChatContext } from "@/context/ChatContext"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/firebase/firebase"

export const MessagesWindow = () => {
  const [messages, setMessages] = useState<any>()
  const {
    state: { chatId },
  } = useContext(ChatContext)
  const messagesWindowRef = useRef(null)
  useEffect(() => {
    if (chatId) {
      const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
        if (doc.exists()) {
          setMessages(doc.data().messages)
        }
      })

      return () => unsub()
    }
  }, [chatId])

  return (
    <div
      className="flex flex-col gap-5 overflow-y-scroll no-scrollbar"
      ref={messagesWindowRef}
    >
      {messages?.map((m: any) => {
        return (
          <Message m={m} key={m.id} messagesWindowRef={messagesWindowRef} />
        )
      })}
    </div>
  )
}

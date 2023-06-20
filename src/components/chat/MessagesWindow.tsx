"use client"

import {
  useContext,
  useEffect,
  useState,
} from "react"
import { Message } from "./Message"
import { ChatContext } from "@/context/ChatContext"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/firebase/firebase"
import { AuthContext } from "@/context/AuthContext"

export const MessagesWindow = ({
  messagesWindowRef,
}: {
  messagesWindowRef: any
}) => {
  const [messages, setMessages] = useState<any>()
  const {
    state: { chatId },
  } = useContext(ChatContext)
  const currentUser = useContext(AuthContext)

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
      className="flex flex-col gap-4 p-4 overflow-y-scroll no-scrollbar"
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

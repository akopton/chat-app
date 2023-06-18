"use client"

import {
  Ref,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { Message } from "./Message"
import { ChatContext } from "@/context/ChatContext"
import { doc, onSnapshot, updateDoc } from "firebase/firestore"
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

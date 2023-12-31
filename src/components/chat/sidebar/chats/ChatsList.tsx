"use client"
import { useContext, useEffect, useState } from "react"
import { Chat } from "./Chat"
import { AuthContext } from "@/context/AuthContext"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/firebase/firebase"

export const ChatsList = () => {
  const [chats, setChats] = useState<any>()
  const currentUser = useContext(AuthContext)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      if (doc.data()) setChats(doc.data())
    })

    return () => unsub()
  }, [currentUser.uid])

  return (
    <ul className="flex flex-col w-72">
      {chats &&
        Object.entries(chats)
          .sort((a: [string, any], b: [string, any]) => b[1].date - a[1].date)
          .map((chat: any) => {
            return <Chat key={chat[0]} chatId={chat[0]} data={chat[1]} />
          })}
    </ul>
  )
}

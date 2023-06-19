"use client"

import { AuthContext } from "@/context/AuthContext"
import { ChatContext } from "@/context/ChatContext"
import { useContext, useEffect, useState } from "react"

export const Message = ({ m, messagesWindowRef }: any) => {
  const currentUser = useContext(AuthContext)
  const { state } = useContext(ChatContext)
  const [isImgOpened, setIsImgOpened] = useState<boolean>()

  useEffect(() => {
    messagesWindowRef.current.scrollTop = messagesWindowRef.current.scrollHeight
  }, [])

  const showImage = () => {
    setIsImgOpened(true)
  }

  return (
    <div
      className={`flex items-end gap-5 ${
        currentUser.uid === m.senderId ? "self-end" : "self-start"
      }`}
    >
      <div
        className={` w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ${
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
          className=""
        />
      </div>
      <div
        className={`flex flex-col gap-2 ${
          currentUser.uid === m.senderId ? "items-end" : "items-start"
        }`}
      >
        {m.img && (
          <img
            src={m.img}
            alt=""
            className="h-24 w-24 rounded-3xl"
            onClick={() => showImage()}
          />
        )}
        {isImgOpened && (
          <div
            className="overflow-hidden absolute top-0 left-0 h-full w-full bg-white bg-opacity-60 z-20 backdrop-blur-sm"
            onClick={() => setIsImgOpened(false)}
          >
            <img
              src={m.img}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-50 rounded-3xl"
            />
          </div>
        )}
        {m.text && (
          <p
            className={`max-w-md px-4 py-2 rounded-3xl flex flex-col items-center gap-2 text-white ${
              currentUser.uid === m.senderId ? "bg-teal-700" : "bg-neutral-800"
            }`}
          >
            {m.text}
          </p>
        )}
      </div>
    </div>
  )
}

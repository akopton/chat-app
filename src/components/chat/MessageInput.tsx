"use client"

import { AuthContext } from "@/context/AuthContext"
import { ChatContext } from "@/context/ChatContext"
import { db, storage } from "@/firebase/firebase"
import { inputResize } from "@/utils/inputResize"
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { Ref, useContext, useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import {
  RiCheckboxCircleFill,
  RiImageAddLine,
  RiSendPlane2Line,
} from "react-icons/ri"
import { addNewMessage } from "@/utils/addNewMessage"

export const MessageInput = ({
  messagesWindowRef,
}: {
  messagesWindowRef: any
}) => {
  const [text, setText] = useState<string>("")
  const [img, setImg] = useState<File | undefined>()
  const { state } = useContext(ChatContext)
  const currentUser = useContext(AuthContext)

  const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    setImg(file)
  }

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    inputResize(e)
    messagesWindowRef.current.scrollTop = messagesWindowRef.current.scrollHeight
    setText(e.currentTarget.value)
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const formEvent = e as React.FormEvent
      e.currentTarget.style.height = "40px"
      handleSubmit(formEvent)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text && !img) return
    setText("")
    setImg(undefined)
    await addNewMessage({ state, currentUser, text, img })
  }

  return (
    <form
      className="text-white w-full sticky bottom-0 top-full flex p-4 justify-around"
      onSubmit={handleSubmit}
    >
      <textarea
        className="text-white resize-none outline-none  placeholder:text-gray-400 px-2 py-2 bg-neutral-800 rounded-md w-9/12 no-scrollbar"
        placeholder="Type your message here..."
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        style={{ height: "40px", minHeight: "10px" }}
        value={text}
      />
      <div className="right-2 bottom-0 flex items-center justify-center gap-4 self-end">
        <input type="file" id="file" className="hidden" onChange={handleFile} />
        <label htmlFor="file" className="cursor-pointer text-3xl relative">
          <RiImageAddLine />
          {img && (
            <div className="absolute -top-1 -left-2 bg-white rounded-full">
              <RiCheckboxCircleFill className="w-full h-full text-xl text-green-600 font-bold" />
            </div>
          )}
        </label>
        <button type="submit" className="cursor-pointer text-3xl">
          <RiSendPlane2Line />
        </button>
      </div>
    </form>
  )
}

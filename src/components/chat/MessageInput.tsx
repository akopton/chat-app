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
  const currentUser = useContext(AuthContext)
  const { state } = useContext(ChatContext)

  const [text, setText] = useState<string>("")
  const [img, setImg] = useState<File | undefined>()

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
    if (!img) {
      const docRef = doc(db, "chats", state.chatId)
      await addNewMessage(docRef, text, currentUser.uid, Timestamp.now())
    } else {
      const docRef = doc(db, "chats", state.chatId)
      const storageRef = ref(storage, uuid())
      const uploadTask = uploadBytesResumable(storageRef, img)
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          console.log(err)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL: string) => {
              await addNewMessage(
                docRef,
                text,
                currentUser.uid,
                Timestamp.now(),
                downloadURL
              )
            }
          )
        }
      )
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [state.chatId + ".lastMessage"]: {
        text,
        senderId: currentUser.uid,
        isOpened: true,
        img: img === undefined ? false : true,
      },
      [state.chatId + ".date"]: serverTimestamp(),
    })
    await updateDoc(doc(db, "userChats", state.user.uid), {
      [state.chatId + ".lastMessage"]: {
        text,
        senderId: currentUser.uid,
        isOpened: false,
        img: img ? true : false,
      },
      [state.chatId + ".date"]: serverTimestamp(),
    })
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

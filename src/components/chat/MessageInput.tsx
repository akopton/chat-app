"use client"

import { AuthContext } from "@/context/AuthContext"
import { ChatContext } from "@/context/ChatContext"
import { db, storage } from "@/firebase/firebase"
import { inputResize } from "@/utils/inputResize"
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { Ref, useContext, useState } from "react"
import { v4 as uuid } from "uuid"

export const MessageInput = ({
  messagesWindowRef,
}: {
  messagesWindowRef: any
}) => {
  const currentUser = useContext(AuthContext)
  const { state } = useContext(ChatContext)

  const [text, setText] = useState<string>()
  const [img, setImg] = useState<File | undefined>()

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    inputResize(e)
    messagesWindowRef.current.scrollTop = messagesWindowRef.current.scrollHeight
    setText(e.currentTarget.value)
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const formEvent = e as React.FormEvent

      handleSubmit(formEvent)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setText("")
    setImg(undefined)
    if (!img) {
      await updateDoc(doc(db, "chats", state.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      })
    } else {
      const storageRef = ref(storage, uuid())
      const uploadTask = uploadBytesResumable(storageRef, img)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log("Upload is " + progress + "% done")
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused")
              break
            case "running":
              console.log("Upload is running")
              break
          }
        },
        (err) => {
          console.log(err)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL: string) => {
              await updateDoc(doc(db, "chats", state.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text: text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              })
            }
          )
        }
      )
    }
  }

  return (
    <form
      className="text-white w-full sticky bottom-0 top-full flex"
      onSubmit={handleSubmit}
    >
      <textarea
        className="text-white resize-none outline-none  placeholder:text-gray-400 px-2 py-2 bg-slate-500 rounded-md w-9/12 no-scrollbar"
        placeholder="Type your message here..."
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        style={{ height: "auto", minHeight: "10px" }}
        value={text}
      />
      <div className="absolute right-2 bottom-0 w-1/6 flex items-center">
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={(e) => setImg(e.target.files?.[0])}
        />
        <label htmlFor="file" className="cursor-pointer text-3xl">
          +
        </label>
        <button type="submit" className="cursor-pointer text-3xl">
          {"->"}
        </button>
      </div>
    </form>
  )
}

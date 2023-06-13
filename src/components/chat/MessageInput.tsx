"use client"

import { inputResize } from "@/utils/inputResize"
import { useEffect, useState } from "react"

export const MessageInput = ({ messagesWindowRef, setMessages }: any) => {
  const [newMessage, setNewMessage] = useState<string>("")

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    inputResize(e)
    messagesWindowRef.current.scrollTop = messagesWindowRef.current.scrollHeight
    setNewMessage(e.currentTarget.value)
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const formEvent = e as React.FormEvent
      handleSubmit(formEvent)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage) return
    setMessages((prevState: any) => [...prevState, newMessage])
    setTimeout(() => {
      messagesWindowRef.current.scrollTop =
        messagesWindowRef.current.scrollHeight
    }, 100)
    setNewMessage("")
  }

  return (
    <form className="text-white w-full relative flex" onSubmit={handleSubmit}>
      <textarea
        className="text-white resize-none outline-none  placeholder:text-gray-400 px-2 py-2 bg-slate-500 rounded-md w-9/12 no-scrollbar"
        placeholder="Type your message here..."
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        style={{ height: "auto", minHeight: "10px" }}
        value={newMessage}
      />
      <div className="absolute right-2 bottom-0 w-1/6 flex items-center">
        <input type="file" id="file" className="hidden" />
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

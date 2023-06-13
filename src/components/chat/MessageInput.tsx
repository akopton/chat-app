"use client"

import {
  ReactEventHandler,
  SyntheticEvent,
  TextareaHTMLAttributes,
} from "react"

export const MessageInput = () => {
  const inputResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.scrollHeight > 200) return
    e.currentTarget.style.height = "auto"
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
  }

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    inputResize(e)
  }

  return (
    <form className="text-white w-full relative flex">
      <textarea
        className="text-white resize-none outline-none  placeholder:text-gray-500 px-1 py-2 bg-red-300 rounded-md w-4/6 no-scrollbar"
        placeholder="Type your message here..."
        onChange={handleInput}
        style={{ height: "auto", minHeight: "10px" }}
      />
      <div className="absolute right-2 bottom-0 flex items-center justify-center w-2/6 gap-10">
        <input type="file" id="file" className="hidden" />
        <label
          htmlFor="file"
          className="flex items-center justify-center cursor-pointer text-2xl"
        >
          +
        </label>
        <button type="submit" className="cursor-pointer">
          {"->"}
        </button>
      </div>
    </form>
  )
}

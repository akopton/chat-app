"use client"

import { inputResize } from "@/utils/inputResize"

export const MessageInput = ({ messagesWindowRef }: any) => {
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    inputResize(e)
    messagesWindowRef.current.scrollTop = messagesWindowRef.current.scrollHeight
  }

  return (
    <form className="text-white w-full relative flex">
      <textarea
        className="text-white resize-none outline-none  placeholder:text-gray-400 px-2 py-2 bg-slate-500 rounded-md w-9/12 no-scrollbar"
        placeholder="Type your message here..."
        onChange={handleInput}
        style={{ height: "auto", minHeight: "10px" }}
      ></textarea>
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

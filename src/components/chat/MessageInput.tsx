"use client"

export const MessageInput = () => {
  return (
    <form className="text-white absolute left-0 bottom-0 w-full border-t-2 border-black px-1 h-18 flex">
      <div className="h-full w-5/6 text-blackborder-r border-black px-1 py-2 flex items-center justify-between">
        <textarea
          className="text-white resize-none outline-none bg-slate-400 placeholder:text-gray-500 w-5/6 border-r"
          placeholder="Type your message here..."
        />
        <input type="file" id="file" className="hidden" />
        <label
          htmlFor="file"
          className="flex items-center justify-center cursor-pointer text-2xl"
        >
          +
        </label>
      </div>
      <button type="submit" className="w-1/6 cursor-pointer">
        {"->"}
      </button>
    </form>
  )
}

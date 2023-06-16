"use client"

import { ChatContext } from "@/context/ChatContext"
import { TUserInfo } from "@/types/TUserInfo"
import { useContext } from "react"

export const User = ({ data }: any) => {
  const { dispatch } = useContext(ChatContext)
  const handleSelect = (user: TUserInfo) => {
    dispatch({ type: "CHANGE_USER", payload: user })
  }

  return (
    <li
      className="flex items-center gap-4 hover:bg-red-100 cursor-pointer p-2"
      onClick={() => handleSelect(data.userInfo)}
    >
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img
          alt=""
          className="object-fill scale-125"
          src={data.userInfo.photoURL}
        />
      </div>
      <div>
        <p>{data.userInfo.displayName}</p>
        <p>{data.lastMessage?.text}</p>
      </div>
    </li>
  )
}

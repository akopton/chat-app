"use client"

import { useDate } from "@/app/hooks/useDate"
import { AuthContext } from "@/context/AuthContext"
import { ChatContext } from "@/context/ChatContext"
import { db } from "@/firebase/firebase"
import { TUserInfo } from "@/types/TUserInfo"
import { doc, updateDoc } from "firebase/firestore"
import { useContext } from "react"
import { BsDot } from "react-icons/bs"

export const Chat = ({ chatId, data }: any) => {
  const { dispatch } = useContext(ChatContext)
  const currentUser = useContext(AuthContext)
  const messageDate = useDate(data.date)

  const handleSelect = async (user: TUserInfo) => {
    dispatch({ type: "CHANGE_USER", payload: user })
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [chatId + ".lastMessage" + ".isOpened"]: true,
    })
  }

  return (
    <li
      className="flex items-center gap-4 hover:bg-neutral-700 cursor-pointer px-4 py-2"
      onClick={() => handleSelect(data.userInfo)}
    >
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img alt="" className=" scale-125" src={data.userInfo.photoURL} />
      </div>
      <div className="w-4/6">
        <p>
          {data.userInfo.displayName.charAt(0).toUpperCase() +
            data.userInfo.displayName.slice(1)}
        </p>
        {data.lastMessage && (
          <div
            className={`flex items-center gap-5  ${
              data.lastMessage.isOpened ? "font-normal" : "font-bold"
            }`}
          >
            {data.lastMessage.text && (
              <p className={`overflow-hidden whitespace-nowrap text-ellipsis`}>
                {data.userInfo.uid === data.lastMessage.senderId
                  ? data.lastMessage.text
                  : `Ty: ${data.lastMessage.text}`}
              </p>
            )}
            {data.lastMessage.text === "" && data.lastMessage.img && (
              <p className={`overflow-hidden whitespace-nowrap text-ellipsis`}>
                {data.userInfo.uid === data.lastMessage.senderId
                  ? "Sent a photo."
                  : `Ty: Photo sent.`}
              </p>
            )}
            <span className="text-xs flex items-center">
              <BsDot className=" text-base" />
              {messageDate}
            </span>
          </div>
        )}
      </div>
    </li>
  )
}

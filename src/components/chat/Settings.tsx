"use client"

import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"
import { User as FirebaseUser } from "firebase/auth"

export const Settings = () => {
  const currentUser: FirebaseUser = useContext(AuthContext)
  return (
    <div className="flex items-center justify-between border-b-2 border-solid border-white py-2 px-1">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 border border-solid border-black bg-red-500 rounded-full"></div>
        <p>{currentUser.displayName}</p>
      </div>
      <button onClick={() => console.log("siemka")}>wyloguj</button>
    </div>
  )
}

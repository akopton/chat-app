"use client"

import { AuthContext } from "../../../context/AuthContext"
import { useContext } from "react"
import { User as FirebaseUser, signOut } from "firebase/auth"
import { auth } from "../../../firebase/firebase"
import { useRouter } from "next/navigation"
import { ChatContext } from "@/context/ChatContext"

export const Settings = () => {
  const currentUser: FirebaseUser = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)
  const router = useRouter()

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/login")
    dispatch({
      type: "CHANGE_USER",
      payload: { displayName: "", photoURL: "", uid: "" },
    })
  }

  return (
    <div className="flex items-center justify-between gap-5 border-b border-solid border-neutral-500 p-4 relative">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={currentUser && `${currentUser.photoURL}`}
            className="object-fill scale-125"
          />
        </div>
        <p>
          {currentUser.displayName &&
            currentUser.displayName?.charAt(0).toUpperCase() +
              currentUser.displayName?.slice(1)}
        </p>
      </div>
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}

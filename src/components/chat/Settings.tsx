"use client"

import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import { User as FirebaseUser, signOut } from "firebase/auth"
import { auth } from "../../firebase/firebase"
import { useRouter } from "next/navigation"

export const Settings = () => {
  const currentUser: FirebaseUser = useContext(AuthContext)
  const router = useRouter()

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/login")
  }

  return (
    <div className="flex items-center gap-5 border-b-2 border-solid border-white py-2 px-1">
      <div className="flex items-center gap-1">
        <div className="w-12 h-12 border border-solid border-black bg-red-500 rounded-full overflow-hidden">
          <img
            src={currentUser && `${currentUser.photoURL}`}
            alt=""
            className="object-fill scale-125"
          />
        </div>
        <p>{currentUser.displayName}</p>
      </div>
      <button onClick={handleLogout}>wyloguj</button>
    </div>
  )
}

"use client"
import { auth } from "../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { ReactNode, createContext, useEffect, useState } from "react"
import { User as FirebaseUser } from "firebase/auth"

const defaultUser = {} as FirebaseUser
export const AuthContext = createContext(defaultUser)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | undefined>()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
      }
    })

    return () => unsub()
  }, [])

  return (
    <AuthContext.Provider value={currentUser ? currentUser : defaultUser}>
      {children}
    </AuthContext.Provider>
  )
}

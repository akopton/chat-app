import { db } from "@/firebase/firebase"
import {
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { KeyboardEvent, KeyboardEventHandler, useEffect, useState } from "react"

export const Search = () => {
  const [user, setUser] = useState<any>(null)
  const [userNotFound, setUserNotFound] = useState<boolean>(false)

  const searchUser = async (e: React.FormEvent<HTMLInputElement>) => {
    const username = e.currentTarget.value
    const usersRef = collection(db, "users")

    setUser(null)
    const q = query(usersRef, where("displayName", "==", username))

    const querySnapshot = await getDocs(q)
    if (!querySnapshot.docs.length && username != "") setUserNotFound(true)
    else setUserNotFound(false)
    querySnapshot.forEach((doc) => {
      setUser(doc.data())
    })
  }

  return (
    <div className="flex flex-col">
      <input
        type="text"
        className="border border-solid border-white rounded-md px-2 py-2 text-white"
        placeholder="Search user..."
        onChange={searchUser}
      />
      {userNotFound && <span>User not found</span>}
      {user && (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border border-solid border-black rounded-full overflow-hidden">
            <img src={user.photoURL} alt="" className="object-fill scale-125" />
          </div>
          <div>
            <p>{user.displayName}</p>
          </div>
        </div>
      )}
    </div>
  )
}

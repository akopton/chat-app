import { AuthContext } from "@/context/AuthContext"
import { db } from "@/firebase/firebase"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore"
import { useContext, useState } from "react"

export const Search = () => {
  const [user, setUser] = useState<any>(null)
  const [username, setUsername] = useState<string>("")
  const [userNotFound, setUserNotFound] = useState<boolean>(false)
  const currentUser = useContext(AuthContext)

  const searchUser = async (e: React.FormEvent<HTMLInputElement>) => {
    const username = e.currentTarget.value.toLowerCase()
    const usersRef = collection(db, "users")

    setUser(null)
    setUsername(e.currentTarget.value)

    const q = query(usersRef, where("displayName", "==", username))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.docs.length && username != "") setUserNotFound(true)
    else setUserNotFound(false)
    querySnapshot.forEach((doc) => {
      setUser(doc.data())
    })
  }

  const selectUser = async () => {
    const chatId =
      currentUser.uid > user.id
        ? currentUser.uid + user.id
        : user.uid + currentUser.uid
    const docRef = doc(db, "chats", chatId)

    try {
      const res = await getDoc(docRef)
      if (!res.exists()) {
        await setDoc(doc(db, "chats", chatId), { messages: [] })

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [chatId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [chatId + ".date"]: serverTimestamp(),
        })

        await updateDoc(doc(db, "userChats", user.uid), {
          [chatId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [chatId + ".date"]: serverTimestamp(),
        })
      }
    } catch (err) {}

    setUsername("")
    setUser(null)
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      <input
        type="text"
        className="border border-solid border-white rounded-md px-2 py-2 text-white"
        placeholder="Search user..."
        onChange={searchUser}
        value={username}
      />
      {userNotFound && <span>User not found</span>}
      {user && (
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => selectUser()}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden">
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

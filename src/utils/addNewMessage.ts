import { TState } from "@/context/ChatContext"
import { db, storage } from "@/firebase/firebase"
import { TUserInfo } from "@/types/TUserInfo"
import { User } from "firebase/auth"
import {
  DocumentData,
  DocumentReference,
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { v4 as uuid } from "uuid"

interface IAddNewMessage {
  state: TState<TUserInfo>
  currentUser: User
  text: string
  img: File | undefined
}

export const addNewMessage = async ({
  state,
  currentUser,
  text,
  img,
}: IAddNewMessage) => {
  if (!img) {
    const docRef = doc(db, "chats", state.chatId)
    await updateDoc(docRef, {
      messages: arrayUnion({
        id: uuid(),
        text: text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    })
  } else {
    const docRef = doc(db, "chats", state.chatId)
    const storageRef = ref(storage, uuid())
    const uploadTask = uploadBytesResumable(storageRef, img)
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        console.log(err)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          async (downloadURL: string) => {
            await updateDoc(docRef, {
              messages: arrayUnion({
                id: uuid(),
                text: text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            })
          }
        )
      }
    )
  }
  await updateDoc(doc(db, "userChats", currentUser.uid), {
    [state.chatId + ".lastMessage"]: {
      text,
      senderId: currentUser.uid,
      isOpened: true,
      img: img === undefined ? false : true,
    },
    [state.chatId + ".date"]: serverTimestamp(),
  })
  await updateDoc(doc(db, "userChats", state.user.uid), {
    [state.chatId + ".lastMessage"]: {
      text,
      senderId: currentUser.uid,
      isOpened: false,
      img: img ? true : false,
    },
    [state.chatId + ".date"]: serverTimestamp(),
  })
}

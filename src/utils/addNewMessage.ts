import {
  DocumentData,
  DocumentReference,
  Timestamp,
  arrayUnion,
  updateDoc,
} from "firebase/firestore"
import { v4 as uuid } from "uuid"

export const addNewMessage = async (
  doc: DocumentReference<DocumentData>,
  text: string | undefined,
  senderId: string,
  date: Timestamp,
  photoUrl?: string
) => {
  if (!photoUrl) {
    await updateDoc(doc, {
      messages: arrayUnion({
        id: uuid(),
        text: text,
        senderId: senderId,
        date: date,
      }),
    })
  } else {
    await updateDoc(doc, {
      messages: arrayUnion({
        id: uuid(),
        text: text,
        senderId: senderId,
        date: date,
        img: photoUrl,
      }),
    })
  }
}

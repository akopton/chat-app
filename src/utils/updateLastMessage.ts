import {
  DocumentData,
  DocumentReference,
  FieldValue,
  updateDoc,
} from "firebase/firestore"

export const updateLastMessage = async (
  doc: DocumentReference<DocumentData>,
  chatId: string,
  text: string,
  senderId: string,
  isOpened: boolean,
  date: FieldValue
) => {
  await updateDoc(doc, {
    [chatId + ".lastMessage"]: {
      text,
      senderId: senderId,
      isOpened: isOpened,
    },
    [chatId + ".date"]: date,
  })
}

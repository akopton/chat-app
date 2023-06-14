import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA75BTa0u_7IbE0kOfxyjvqoPhOQ7ZrjTs",
  authDomain: "chat-app-e0857.firebaseapp.com",
  projectId: "chat-app-e0857",
  storageBucket: "chat-app-e0857.appspot.com",
  messagingSenderId: "1047856937429",
  appId: "1:1047856937429:web:b9066f5250b9a60ef4a55c",
  measurementId: "G-1HZKPXDL14",
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()

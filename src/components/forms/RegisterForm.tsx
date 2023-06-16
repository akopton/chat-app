"use client"

import React, { ChangeEvent, useState } from "react"
import { CustomInput } from "./CustomInput"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { setDoc, doc } from "firebase/firestore"
import { auth, db, storage } from "../../firebase/firebase"
import { useRouter } from "next/navigation"

export const RegisterForm = ({}) => {
  const [displayName, setDisplayName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [photo, setPhoto] = useState<File>()
  const [dbConnectionError, setDbConnectionError] = useState<boolean>(false)
  const [errors, setErrors] = useState<{
    name: boolean
    email: boolean
    password: boolean
    photo: boolean
  }>({ name: false, email: false, password: false, photo: false })
  const router = useRouter()

  const handleName = (e: React.FormEvent<HTMLInputElement>) => {
    setDisplayName(e.currentTarget.value.toLowerCase())
  }
  const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setPhoto(file)
  }

  const dataValidation = (): boolean => {
    if (!displayName) {
      setErrors((prevState) => ({ ...prevState, name: true }))
      return false
    } else setErrors((prevState) => ({ ...prevState, name: false }))

    if (!email) {
      setErrors((prevState) => ({ ...prevState, email: true }))
      return false
    } else setErrors((prevState) => ({ ...prevState, email: false }))

    if (!password) {
      setErrors((prevState) => ({ ...prevState, password: true }))
      return false
    } else setErrors((prevState) => ({ ...prevState, password: false }))

    if (!photo) {
      setErrors((prevState) => ({ ...prevState, photo: true }))
      return false
    } else setErrors((prevState) => ({ ...prevState, photo: false }))

    return true
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    if (!dataValidation()) return

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const storageRef = ref(storage, displayName)

      if (photo) {
        const uploadTask = uploadBytesResumable(storageRef, photo)
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log("Upload is " + progress + "% done")
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused")
                break
              case "running":
                console.log("Upload is running")
                break
            }
          },
          (err) => {
            console.log(err)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL: string) => {
                await updateProfile(res.user, {
                  displayName,
                  photoURL: downloadURL,
                })
                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                })
                await setDoc(doc(db, "userChats", res.user.uid), {})
                router.push("/")
              }
            )
          }
        )
      }
    } catch (err) {
      console.error(err)
      setDbConnectionError(true)
    } finally {
      setDbConnectionError(false)
    }
  }

  return (
    <form
      className="flex flex-col items-center gap-5 text-white"
      onSubmit={handleSubmit}
    >
      <CustomInput
        id="name"
        name="name"
        type="text"
        placeholder="Display name"
        value={displayName}
        onChange={handleName}
      />
      <CustomInput
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmail}
      />
      <CustomInput
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePassword}
      />
      <input type="file" name="photo" id="photo" onChange={handlePhoto} />
      <input
        type="submit"
        value="Send"
        className="cursor-pointer border-2 border-teal-500 rounded-xl px-8 py-1 text-2xl hover:rounded-3xl transition-all flex items-center justify-center"
      />
    </form>
  )
}

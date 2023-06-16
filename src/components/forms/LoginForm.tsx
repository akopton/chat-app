"use client"

import { useState } from "react"
import { CustomInput } from "./CustomInput"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/firebase"
import { useRouter } from "next/navigation"

export const LoginForm = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [dbConnectionError, setDbConnectionError] = useState<boolean>(false)
  const [errors, setErrors] = useState<{
    name: boolean
    email: boolean
    password: boolean
  }>({ name: false, email: false, password: false })

  const router = useRouter()

  const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  const dataValidation = (): boolean => {
    if (!email) {
      setErrors((prevState) => ({ ...prevState, email: true }))
      return false
    } else setErrors((prevState) => ({ ...prevState, email: false }))
    if (!password) {
      setErrors((prevState) => ({ ...prevState, password: true }))
      return false
    } else setErrors((prevState) => ({ ...prevState, password: false }))

    return true
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    if (!dataValidation()) return

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/")
    } catch (err) {
      console.error(err)
      setDbConnectionError(true)
    } finally {
      setDbConnectionError(false)
    }
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
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
      <input type="submit" value="Send" className="cursor-pointer" />
    </form>
  )
}

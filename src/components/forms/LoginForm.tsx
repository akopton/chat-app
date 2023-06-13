"use client"

import { useState } from "react"
import { CustomInput } from "./CustomInput"

export const LoginForm = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("login: " + email, "password: " + password)
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <CustomInput
        id="login"
        name="login"
        type="text"
        value={email}
        onChange={handleEmail}
      />
      <CustomInput
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={handlePassword}
      />
      <input type="submit" value="Send" className="cursor-pointer" />
    </form>
  )
}

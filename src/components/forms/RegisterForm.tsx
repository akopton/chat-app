"use client"

import React, { useState } from "react"
import { CustomInput } from "./CustomInput"

export const RegisterForm = () => {
  const [displayName, setDisplayName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleName = (e: React.FormEvent<HTMLInputElement>) => {
    setDisplayName(e.currentTarget.value)
  }
  const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
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
      <input type="submit" value="Send" />
    </form>
  )
}

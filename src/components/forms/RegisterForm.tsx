"use client"

import { useState } from "react"

export const RegisterForm = () => {
  const [email, setEmail] = useState<string>("")
  const [displayName, setDisplayName] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  return (
    <form className="flex flex-col gap-3">
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <input type="submit" value="Send" />
    </form>
  )
}

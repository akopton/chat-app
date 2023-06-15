"use client"
import { User } from "./User"

export const Users = () => {
  return (
    <ul className="flex flex-col gap-4 px-1">
      <User />
      <User />
      <User />
    </ul>
  )
}

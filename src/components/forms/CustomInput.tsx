"use client"

import { ChangeEventHandler } from "react"

interface InputProps {
  id: string
  type: string
  name: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const CustomInput = ({
  id,
  type,
  name,
  value,
  onChange,
}: InputProps) => {
  return (
    <input
      className="px-2 py-1 bg"
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}

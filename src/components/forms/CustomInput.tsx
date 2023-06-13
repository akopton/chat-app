"use client"

import { ChangeEventHandler } from "react"

interface InputProps {
  id: string
  type: string
  name: string
  placeholder: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const CustomInput = ({
  id,
  type,
  name,
  value,
  placeholder,
  onChange,
}: InputProps) => {
  return (
    <input
      className="px-2 py-1 bg-transparent border-b-2 border-black text-xl"
      id={id}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

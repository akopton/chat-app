"use client"
export const User = () => {
  return (
    <li className="flex items-center gap-4">
      <div className="h-12 w-12 bg-red-500 rounded-full"></div>
      <div>
        <p>user name</p>
        <p>last message</p>
      </div>
    </li>
  )
}

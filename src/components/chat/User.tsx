"use client"
export const User = () => {
  return (
    <li className="flex items-center gap-4">
      <div className="w-12 h-12 border border-solid border-black bg-red-500 rounded-full overflow-hidden">
        <img alt="" className="object-fill scale-125" />
      </div>
      <div>
        <p>user name</p>
        <p>last message</p>
      </div>
    </li>
  )
}

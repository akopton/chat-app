"use client"
export const User = ({ data }: any) => {
  return (
    <li className="flex items-center gap-4 hover:bg-red-100 cursor-pointer p-2">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img
          alt=""
          className="object-fill scale-125"
          src={data.userInfo.photoURL}
        />
      </div>
      <div>
        <p>{data.userInfo.displayName}</p>
        <p>{data.lastMessage?.text}</p>
      </div>
    </li>
  )
}

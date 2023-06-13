"use client"

export const Message = ({ text }: { text: string }) => {
  return (
    <div className="bg-slate-600 text-white  p-2">
      <p>{text}</p>
    </div>
  )
}

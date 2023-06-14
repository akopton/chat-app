"use client"

export const Message = ({ text, id }: { text: string; id: number }) => {
  return (
    <div
      className={
        "bg-slate-600 text-white p-2 " +
        `${id % 2 === 0 ? "self-start" : "self-end"}`
      }
    >
      <p>{text}</p>
    </div>
  )
}

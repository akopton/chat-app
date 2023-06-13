import Link from "next/link"
import LoginPage from "./login/page"
import { ChatWindow } from "@/components/chat/ChatWindow"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 h-screen w-screen">
      <ChatWindow />
    </main>
  )
}

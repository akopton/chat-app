import Link from "next/link"
import LoginPage from "./login/page"
import { ChatWindow } from "@/components/chat/ChatWindow"
import { AuthContextProvider } from "@/context/AuthContext"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 h-screen w-screen">
      <AuthContextProvider>
        <ChatWindow />
      </AuthContextProvider>
    </main>
  )
}

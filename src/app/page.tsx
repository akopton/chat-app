import { ChatWindow } from "@/components/chat/ChatWindow"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 h-screen w-screen bg-neutral-700">
      <ChatWindow />
    </main>
  )
}

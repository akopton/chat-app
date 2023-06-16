import { LoginForm } from "@/components/forms/LoginForm"
import { AuthContextProvider } from "../../context/AuthContext"
import Link from "next/link"

export default function LoginPage() {
  return (
    <main className="h-screen w-screen flex items-center justify-center bg-zinc-700">
      <div className="flex flex-col items-center gap-14 border-4 border-teal-500 p-14 rounded-3xl text-white">
        <p className="text-3xl">Chat App</p>
        <AuthContextProvider>
          <LoginForm />
        </AuthContextProvider>
        <p className="text-xl">
          Still not registered?{" "}
          <Link href="/register" className="underline text-teal-500">
            Register here
          </Link>
        </p>
      </div>
    </main>
  )
}

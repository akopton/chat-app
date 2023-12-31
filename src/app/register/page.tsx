import { RegisterForm } from "@/components/forms/RegisterForm"
import { AuthContextProvider } from "../../context/AuthContext"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <main className="h-screen w-screen flex items-center justify-center bg-neutral-700">
      <div className="flex flex-col items-center gap-14 border-4 border-teal-500 p-14 rounded-3xl text-white">
        <p className="text-3xl">Chat App</p>
        <RegisterForm />
        <Link href="/login" className="underline text-teal-500 text-xl">
          Back to login
        </Link>
      </div>
    </main>
  )
}

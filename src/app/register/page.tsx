import { RegisterForm } from "@/components/forms/RegisterForm"
import { AuthContextProvider } from "@/context/AuthContext"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center gap-10 border-2 border-solid border-black px-10 py-10 rounded-xl bg-slate-300">
      <p>Register page</p>
      <AuthContextProvider>
        <RegisterForm />
      </AuthContextProvider>
      <Link href="/">go back</Link>
    </div>
  )
}

import { LoginForm } from "@/components/forms/LoginForm"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-10 border-2 border-solid border-black px-10 py-10 rounded-xl bg-slate-300">
      <p>Login page</p>
      <LoginForm />
      <Link href="/">go back</Link>
    </div>
  )
}

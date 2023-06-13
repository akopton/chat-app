import { LoginForm } from "@/components/LoginForm"
import Link from "next/link"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Login page</p>
      <LoginForm />
      <Link href="/">go back</Link>
    </main>
  )
}

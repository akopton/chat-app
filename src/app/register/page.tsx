import { RegisterForm } from "@/components/forms/RegisterForm"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Register page</p>
      <RegisterForm />
      <Link href="/">go back</Link>
    </main>
  )
}

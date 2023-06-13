import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Witam</p>
      <Link href={"/login"}>Login page</Link>
      <Link href={"/register"}>Register page</Link>
    </main>
  )
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="p-24 min-h-screen max-h-screen flex items-center justify-center">
      {children}
    </main>
  )
}

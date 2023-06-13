export const inputResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
  if (e.currentTarget.scrollHeight > 200) return
  e.currentTarget.style.height = "auto"
  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
}

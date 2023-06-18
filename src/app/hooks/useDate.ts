import { Timestamp } from "firebase/firestore"

export const useDate = (date: Timestamp) => {
  if (!date) return
  const resultDate = date?.toDate()
  const dayName = resultDate.toLocaleDateString("pl-PL", { weekday: "short" })
  return dayName
}

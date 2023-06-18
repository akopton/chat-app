import { Timestamp } from "firebase/firestore"

const dayMonthDate = (date: Date) => {
  const day = `${date.getDate()}`
  const month =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`

  return day + "." + month
}

export const useDate = (val: Timestamp) => {
  if (!val) return

  const date = val?.toDate()
  const msCurrentDate = Date.now()
  const msDate = date.getTime()
  const msDateDiff = msCurrentDate - msDate
  const daysDiff = Math.floor(msDateDiff / (1000 * 60 * 60 * 24))

  if (daysDiff > 6) {
    return dayMonthDate(date)
  }

  const dayName = date.toLocaleDateString("pl-PL", { weekday: "short" })
  return dayName
}

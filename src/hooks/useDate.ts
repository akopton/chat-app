import { Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"

const dayMonthDate = (date: Date) => {
  const day = `${date.getDate()}`
  const month =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`

  return day + "." + month
}

export const useDate = (val: Timestamp) => {
  const [date, setDate] = useState<string>()

  useEffect(() => {
    if (!val) return
    const newDate = val.toDate()
    const msCurrentDate = Date.now()
    const msDate = newDate.getTime()
    const msDateDiff = msCurrentDate - msDate
    const daysDiff = Math.floor(msDateDiff / (1000 * 60 * 60 * 24))
    const dayName = newDate.toLocaleDateString("pl-PL", { weekday: "short" })
    if (daysDiff > 6) {
      setDate(() => dayMonthDate(newDate))
    } else {
      setDate(dayName)
    }
  }, [val])

  return date
}

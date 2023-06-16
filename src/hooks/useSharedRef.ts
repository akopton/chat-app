import { useRef, useCallback } from "react"

const useSharedRef = () => {
  const sharedRef = useRef(null)

  const setSharedRef = useCallback((value: any) => {
    sharedRef.current = value
  }, [])

  return [sharedRef, setSharedRef]
}

export default useSharedRef

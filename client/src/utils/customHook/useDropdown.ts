import { useState, useCallback } from "react"

export const useDropdown = (initialState: any) => {
  const [selected, setSelected] = useState<any>(initialState)

  const getSelectEmulaterType = useCallback(
    (event: any) => {
      setSelected(event.target.value)
    },
    [selected]
  )

  return [selected, getSelectEmulaterType]
}

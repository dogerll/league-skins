import { createContext, useContext } from 'react'

export const AlertContext = createContext<{ setAlert: (message: string) => void }>({
  setAlert: () => {}
})

export function useAlert(): { setAlert: (message: string) => void } {
  return useContext(AlertContext)
}

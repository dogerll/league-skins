import { createContext, useContext } from 'react'

export type ConfirmProps = {
  title: string
  message: string
  onConfirm: () => void
}

export const ConfirmContext = createContext<{
  setConfirmProps: (props: ConfirmProps) => void
}>({
  setConfirmProps: () => {}
})

export function useConfirm(): { setConfirmProps: (props: ConfirmProps) => void } {
  return useContext(ConfirmContext)
}

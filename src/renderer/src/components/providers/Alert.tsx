import React, { useState, useEffect } from 'react'

import { AlertContext } from '@renderer/hooks/Alert'
import CoolBorder from '@renderer/components/svgs/CoolBorder'

export default function Alert({ children }: { children: React.ReactNode }): JSX.Element {
  const [alert, setAlert] = useState<string | null>(null)

  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => {
        setAlert(null)
      }, 3000)

      return (): void => clearTimeout(timeout)
    }
    return undefined
  }, [alert])

  return (
    <AlertContext.Provider value={{ setAlert }}>
      {alert && (
        <div className="alert">
          <CoolBorder position="top" />
          <div className="alert-content">{alert}</div>
          <CoolBorder position="bottom" />
        </div>
      )}
      {children}
    </AlertContext.Provider>
  )
}

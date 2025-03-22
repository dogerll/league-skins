import React, { useState } from 'react'

import { ConfirmContext, ConfirmProps } from '@renderer/hooks/Confirm'
import OffCanvas from '@renderer/components/OffCanvas'

export default function Alert({ children }: { children: React.ReactNode }): JSX.Element {
  const [confirmProps, setConfirmProps] = useState<ConfirmProps | null>(null)

  const active = !!(confirmProps?.title || confirmProps?.message)
  const setActive = (active: boolean): void => {
    if (!active) setConfirmProps(null)
  }

  return (
    <ConfirmContext.Provider value={{ setConfirmProps }}>
      <OffCanvas
        active={active}
        setActive={setActive}
        exitOnClickOutside={true}
        displayExitButton={false}
        compact={true}
      >
        <h3> {confirmProps?.title} </h3>
        <p> {confirmProps?.message} </p>
        <div className="button-group">
          <button
            onClick={() => {
              confirmProps?.onConfirm()
              setActive(false)
            }}
          >
            Confirm
          </button>
          <button onClick={() => setActive(false)}>Cancel</button>
        </div>
      </OffCanvas>
      {children}
    </ConfirmContext.Provider>
  )
}

import React from 'react'

import CoolBorder from '@renderer/components/svgs/CoolBorder'

export type OffCanvasProps = {
  active: boolean
  setActive: (active: boolean) => void
  exitOnClickOutside?: boolean
  displayExitButton?: boolean
  exitButtonText?: string
  compact?: boolean
  children: React.ReactNode
}

export default function OffCanvas({
  active,
  setActive,
  exitOnClickOutside = false,
  displayExitButton = true,
  exitButtonText = 'done',
  compact = false,
  children
}: OffCanvasProps): JSX.Element {
  return (
    <>
      <div
        className={`background-filter ${active ? 'active' : ''}`}
        onClick={() => exitOnClickOutside && setActive(false)}
      />

      <div className={`off-canvas ${active ? 'active' : ''} ${compact ? 'compact' : ''}`}>
        <CoolBorder position="top" />

        <div className="off-canvas-content">
          {children}

          {displayExitButton && (
            <button className="exit-button" onClick={() => setActive(false)}>
              {exitButtonText}
            </button>
          )}
        </div>

        <CoolBorder position="bottom" />
      </div>
    </>
  )
}

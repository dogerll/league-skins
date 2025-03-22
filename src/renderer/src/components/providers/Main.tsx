import React from 'react'

import Alert from '@renderer/components/providers/Alert'
import Confirm from '@renderer/components/providers/Confirm'

export default function Providers({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <Alert>
      <Confirm>{children}</Confirm>
    </Alert>
  )
}

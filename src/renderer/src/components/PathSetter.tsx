import { useEffect } from 'react'

import OffCanvas from '@renderer/components/OffCanvas'
import { useAlert } from '@renderer/hooks/Alert'

export default function PathSetter({ ready }: { ready: () => void }): JSX.Element {
  const { setAlert } = useAlert()

  useEffect(() => {
    ;(async (): Promise<void> => {
      if (await window.api.isCurrentLeaguePathValid()) ready()
    })()
  }, [ready])

  const selectFolder = async (): Promise<void> => {
    const success = await window.api.askAndSetLeaguePath()
    if (success) ready()
    else setAlert('Could not set League of Legends path or path is invalid')
  }

  return (
    <OffCanvas active={true} setActive={() => null} compact displayExitButton={false}>
      <h3>Could not find League of Legends</h3>
      <p> Please set the path to the League of Legends folder manually </p>
      <button onClick={selectFolder}> Select Folder </button>
    </OffCanvas>
  )
}

import { useState, useEffect } from 'react'

import Providers from '@renderer/components/providers/Main'
import PathSetter from '@renderer/components/PathSetter'
import AssetDownloader from '@renderer/components/AssetDownloader'
import SkinSelector from '@renderer/components/SkinSelector'
import Loader from '@renderer/components/Loader'

function App(): JSX.Element {
  const [settingPath, setSettingPath] = useState(true)
  const [downloading, setDownloading] = useState(true)
  const [skins, setSkins] = useState<Skin[]>([])

  // Fetch initial skins
  useEffect(() => {
    ;(async (): Promise<void> => {
      setSkins(await window.api.getSkins())
    })()
  }, [])

  // Watch for skin changes
  useEffect(() => {
    const onSkinsChangeHandler = (_: IpcRendererEvent, newSkins: Skin[]): void => setSkins(newSkins)
    window.api.onSkinsChange(onSkinsChangeHandler)
    return (): void => window.api.offSkinsChange(onSkinsChangeHandler)
  }, [])

  if (settingPath) return <PathSetter ready={() => setSettingPath(false)} />

  return (
    <Providers>
      {!downloading && !skins.length && (
        <div style={{ textAlign: 'center' }}>
          <h3> Waiting for champion to be selected... </h3>
          <Loader />
        </div>
      )}
      {!!skins.length && <SkinSelector skins={skins} />}
      <AssetDownloader downloading={downloading} setDownloading={setDownloading} />
    </Providers>
  )
}

export default App

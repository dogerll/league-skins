import { useState, useEffect } from 'react'

import Providers from '@renderer/components/providers/Main'
import PathSetter from '@renderer/components/PathSetter'
import AssetDownloader from '@renderer/components/AssetDownloader'
import ChampionSelector from '@renderer/components/ChampionSelector'
import SkinSelector from '@renderer/components/SkinSelector'

export default function App(): JSX.Element {
  const [settingPath, setSettingPath] = useState(true)
  const [downloading, setDownloading] = useState(true)
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null)

  // Scroll to top when view changes (because champion changes)
  useEffect(() => {
    document.getElementById('root')?.scrollTo(0, 0)
  }, [selectedChampion])

  if (settingPath) return <PathSetter ready={() => setSettingPath(false)} />

  return (
    <Providers>
      <AssetDownloader downloading={downloading} setDownloading={setDownloading} />
      {/* With key force re-rendering of ChampionSelector and SkinSelector when downloading changes */}
      <div key={downloading ? 'downloading' : 'not-downloading'}>
        <ChampionSelector champion={selectedChampion} setChampion={setSelectedChampion} />
        <SkinSelector champion={selectedChampion} setChampion={setSelectedChampion} />
      </div>
    </Providers>
  )
}

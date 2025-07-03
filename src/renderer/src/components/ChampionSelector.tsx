import { useState, useEffect } from 'react'

import ImageLoader from '@renderer/components/ImageLoader'
import SearchIcon from '@renderer/components/svgs/SearchIcon'

type ChampionSelectorProps = {
  champion: Champion | null
  setChampion: (champ: Champion) => void
}

export default function ChampionSelector({
  champion,
  setChampion
}: ChampionSelectorProps): JSX.Element {
  const [champions, setChampions] = useState<Champion[]>([])
  const [championSearch, setChampionSearch] = useState('')

  // Fetch initial champions
  useEffect(() => {
    ;(async (): Promise<void> => {
      setChampions(await window.api.listChampions())
    })()
  }, [])

  const filteredChampions = champions.filter((c) =>
    c.name.toLowerCase().includes(championSearch.toLowerCase())
  )

  return (
    <div style={{ display: champion === null ? 'block' : 'none' }}>
      <h1> Champions </h1>
      <div id="champions">
        {/* Search Container */}
        <div id="search-container">
          <div style={{ width: '2rem', marginRight: '1rem' }}>
            <SearchIcon />
          </div>
          <input
            type="text"
            value={championSearch}
            onChange={(event) => setChampionSearch(event.target.value)}
            placeholder="SEARCH FOR A CHAMPION"
          />
        </div>

        {/* Champion Cards */}
        {filteredChampions.map((c) => (
          <button className="champion" key={c.id} onClick={() => setChampion(c)}>
            <ImageLoader src={c.image} alt={`${c.name} image`} />
            <div className="champion-name">{c.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

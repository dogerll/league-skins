import { useState } from 'react'

import Loader from '@renderer/components/Loader'
import { useAlert } from '@renderer/hooks/Alert'

function ChromaSelector({ skin }: { skin: Skin }): JSX.Element {
  const { setAlert } = useAlert()

  if (!skin.childSkins.length || !skin.childSkins.every((skin) => skin.colors.length)) return <></>

  return (
    <div className="chroma-container">
      {skin.childSkins
        .filter((chroma) => chroma.colors.length)
        .map((chroma, i) => (
          <div
            key={chroma.id}
            className="chroma-circle"
            style={{ background: `linear-gradient(to top right, ${chroma.colors.join(', ')})` }}
            tabIndex={0}
            role="button"
            onClick={(e) => {
              e.stopPropagation()
              window.api.setSkin(chroma)
              setAlert(`${skin.name} chroma #${i + 1} selected successfully!`)
            }}
          />
        ))}
    </div>
  )
}

export default function SkinSelector({ skins }: { skins: Skin[] }): JSX.Element {
  const [skinsLoaded, setSkinsLoaded] = useState(0)
  const { setAlert } = useAlert()

  return (
    <>
      <h2> {skins[0].championName} </h2>
      <div
        style={{
          textAlign: 'center',
          display: skinsLoaded < skins.length ? 'block' : 'none'
        }}
      >
        <h3> Loading skins... </h3>
        <Loader />
      </div>
      <div
        className="skin-container"
        style={{ visibility: skinsLoaded >= skins.length ? 'visible' : 'hidden' }}
      >
        {skins.map((skin) => (
          <div
            key={skin.id}
            className="skin-card"
            tabIndex={0}
            role="button"
            onClick={() => {
              window.api.setSkin(skin)
              setAlert(`${skin.name} selected successfully!`)
            }}
          >
            <img
              src={skin.loadingURL}
              alt={skin.name}
              onLoad={() => setSkinsLoaded((n) => n + 1)}
            />
            <ChromaSelector skin={skin} />
          </div>
        ))}
      </div>
    </>
  )
}

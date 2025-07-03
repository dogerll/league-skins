import { useState } from 'react'
import Loader from '@renderer/components/Loader'

export default function ImageLoader({ src, alt }: { src: string; alt?: string }): JSX.Element {
  const [loading, setLoading] = useState(true)

  return (
    <div
      className="img"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {loading && <Loader />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        style={{ display: loading ? 'none' : 'block' }}
      />
    </div>
  )
}

/* eslint-disable unicorn/prefer-add-event-listener */
import { useEffect, useState } from 'react'

export const useImage = ({ src }: { src: string | undefined }) => {
  const [loaded, setLoaded] = useState(false)
  const [fetchedBanner, setFetchedBanner] = useState<string | undefined>()

  useEffect(() => {
    if (loaded) return
    if (src) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setFetchedBanner(src)
        setLoaded(true)
      }
    }
  }, [loaded, src])

  return { loaded, fetchedBanner }
}

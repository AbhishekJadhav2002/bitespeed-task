/* eslint-disable @next/next/no-img-element */

import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from 'react'

interface CustomImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  locked?: boolean
  fallback?: string
}

export const CustomImage: FC<CustomImageProps> = ({ alt, src, locked, fallback, ...props }) => {
  const _fallback = fallback ?? '/logo/brand.png'

  return (
    <img
      src={locked ? _fallback : (src ?? _fallback)}
      alt={alt}
      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget
        img.src = _fallback
      }}
      {...props}
    />
  )
}

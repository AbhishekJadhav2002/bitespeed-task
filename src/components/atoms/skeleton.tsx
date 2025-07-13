import type { FC } from 'react'
import type { IContentLoaderProps } from 'react-content-loader'

import ContentLoader from 'react-content-loader'

interface SkeletonProps extends IContentLoaderProps {
  width: number | string
  height: number | string
}

const Skeleton: FC<SkeletonProps> = ({ width, height, ...props }) => {
  return (
    <ContentLoader speed={2} width={width} height={height} viewBox={`0 0 ${width} ${height}`} {...props}>
      <rect x="0" y="0" rx="3" ry="3" width={width} height={height} />
    </ContentLoader>
  )
}

export default Skeleton

import type { JSX } from 'react'

interface ShowProps extends React.PropsWithChildren {
  when: boolean
  fallback?: JSX.Element
}

export const Show = ({ when, children, fallback }: ShowProps) => {
  if (when) {
    return <>{children}</>
  }

  return <>{fallback}</>
}

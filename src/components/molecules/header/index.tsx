import type { FC } from 'react'
import type { ClassNameValue } from '@/lib/cn'

import { HeaderLeft } from '@/components/molecules/header/left'

import { cn } from '@/lib/cn'

interface HeaderComposition {
  Left: typeof HeaderLeft
}

interface HeaderProps {
  left?: React.ReactNode
  right?: React.ReactNode
  center?: React.ReactNode
  className?: ClassNameValue
}

export const Header: FC<HeaderProps> & HeaderComposition = props => {
  const { right, center, className, left = <HeaderLeft /> } = props

  return (
    <header
      className={cn(
        'flex items-stretch justify-between gap-x-3 border-b border-gray-200 px-2.5 py-3 md:px-8',
        className
      )}
    >
      {left}
      {center}
      {right}
    </header>
  )
}

// if you getting these components undefined, make the parent component 'use client' or just use the named exported components
Header.Left = HeaderLeft

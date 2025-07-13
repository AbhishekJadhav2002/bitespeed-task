/* eslint-disable @next/next/no-img-element */
import type { FC } from 'react'
import type { ClassNameValue } from '@/lib/cn'

import Link from 'next/link'

import { cn } from '@/lib/cn'

interface IHeaderLeftProps {
  className?: ClassNameValue
}

export const HeaderLeft: FC<IHeaderLeftProps> = props => {
  const { className } = props

  return (
    <div className={cn('flex-center', className)}>
      <Link className="shrink-0" href="/">
        <img
          src="/icons/logo.svg"
          alt="BiteSpeed"
          loading="lazy"
          decoding="async"
          className="h-6 w-auto max-md:shrink-0!"
        />
      </Link>
    </div>
  )
}

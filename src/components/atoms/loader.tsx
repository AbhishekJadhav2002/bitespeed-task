/* eslint-disable @next/next/no-img-element */

import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

interface LoaderProps {
  isLoading?: boolean
  classNames?: string
  size?: 'large' | 'small'
}

export const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  ({ size = 'large', classNames = '', isLoading = true }, ref) => {
    if (!isLoading) return <></>

    return (
      <div className={cn('flex-center flex-1 text-blue-700', { [classNames]: !!classNames })} ref={ref}>
        <div className={cn('relative h-16 w-16', { 'h-10 w-10': size === 'small' })}>
          <img
            src="/logo/brand.png"
            alt="BiteSpeed"
            className={cn('absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform', {
              'h-6 w-6': size === 'small'
            })}
            loading="lazy"
          />
          <div
            className={cn(
              'inline-block h-16 w-16 animate-spin rounded-full border-2 border-solid border-r-transparent align-[-0.125em] opacity-70 motion-reduce:animate-[spin_1.5s_linear_infinite]',
              {
                'h-10 w-10 border-[1.5px]': size === 'small'
              }
            )}
            role="status"
          />
        </div>
      </div>
    )
  }
)

Loader.displayName = 'Loader'

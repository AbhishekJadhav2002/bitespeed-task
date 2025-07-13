import type { AnchorHTMLAttributes, DetailedHTMLProps, FC } from 'react'

import { cn } from '@/lib/cn'

interface LinkProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  href?: string
  animate?: boolean
  external?: boolean
}

export const ALink: FC<LinkProps> = ({
  children,
  className,
  href = '#',
  external = true,
  animate = false,
  ...rest
}) => {
  return (
    <a
      href={href}
      {...(!!external && href !== '#' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn('text-white', className, {
        'transform duration-200 hover:-translate-y-0.5': animate
      })}
      {...rest}
    >
      {children}
    </a>
  )
}

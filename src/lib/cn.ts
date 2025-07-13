import type { ClassValue } from 'clsx'

import { clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['text-xxs', 'text-tiny', 'text-md']
    }
  }
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type { ClassNameValue } from 'tailwind-merge'

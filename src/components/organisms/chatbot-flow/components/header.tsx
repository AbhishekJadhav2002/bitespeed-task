import type { FC } from 'react'
import type { ClassNameValue } from '@/lib/cn'

import { cn } from '@/lib/cn'

interface IHeaderProps {
  className?: ClassNameValue
  validateAndSave: () => void
}

export const Header: FC<IHeaderProps> = props => {
  const { className, validateAndSave } = props

  return (
    <div className={cn('flex items-center justify-between border-b border-gray-200 bg-black/5 p-4', className)}>
      <h1 className="text-xl font-semibold text-gray-800">Chatbot Flow Builder</h1>
      <div className="flex items-center gap-3">
        <button
          onClick={validateAndSave}
          className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

import type { Node } from '@xyflow/react'
import type { FC } from 'react'
import type { ClassNameValue } from '@/lib/cn'

import { ChevronLeft } from 'lucide-react'

import { cn } from '@/lib/cn'

interface ISettingsPanelProps {
  onBack: () => void
  className?: ClassNameValue
  onTextChange: (text: string) => void
  selectedNode: Node<Record<string, string>> | null
}

export const SettingsPanel: FC<ISettingsPanelProps> = props => {
  const { onBack, className, selectedNode, onTextChange } = props

  return (
    <div className={cn('w-64 border-l border-gray-200 bg-white p-4', className)}>
      <div className="mb-6 flex items-center gap-3">
        <button onClick={onBack} className="rounded-lg p-2 transition-colors hover:bg-gray-100">
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-lg font-semibold text-gray-800">Message</h3>
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
          Text (ID: {selectedNode?.id})
        </label>
        <textarea
          id="message"
          name="message"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          value={selectedNode?.data?.text ?? ''}
          onChange={e => onTextChange(e.target.value)}
          className="h-24 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          placeholder="Enter message"
        />
      </div>
    </div>
  )
}

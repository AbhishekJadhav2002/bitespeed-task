'use client'

import type { FC } from 'react'
import type { ClassNameValue } from '@/lib/cn'

import { Handle, Position } from '@xyflow/react'
import { MessageCircleMore } from 'lucide-react'
import { memo } from 'react'

import { cn } from '@/lib/cn'
import { Show } from '@/lib/show'
import WhatsApp from '@/public/icons/whatsapp-green.svg'

interface ITextNodeProps {
  id: string
  data: unknown
  selected: boolean
  className?: ClassNameValue
}

export const TextNode: FC<ITextNodeProps> = memo(props => {
  const { id, data, selected, className } = props

  return (
    <div
      className={cn('relative max-w-100 min-w-70 rounded-lg border-2 bg-white shadow-lg transition-colors', className, {
        'border-blue-500': selected,
        'border-gray-200': !selected
      })}
      key={id}
      id={id}
    >
      <Handle id={id} type="source" position={Position.Top} title="Source Edge" className="!size-3 !bg-blue-700" />

      <div className="mb-2 flex items-center justify-between gap-x-2 rounded-t-lg bg-teal-200 px-4 py-2">
        <p className="text-xxs">ID: {id}</p>
        <MessageCircleMore size={16} className="text-gray-700" />
        <span className="text-sm font-medium text-gray-700">Send Message</span>
        <WhatsApp className="![&>path]:size-5 ml-auto size-5" />
      </div>

      <Show
        when={!!data && !!(data as { text: string })?.text}
        fallback={
          <Show
            when={selected}
            fallback={<p className="px-2 pb-2 text-xs text-gray-400">Select node to add message</p>}
          >
            <p className="px-2 pb-2 text-xs text-gray-400">Type a message in side panel</p>
          </Show>
        }
      >
        <p className="h-full max-h-40 overflow-x-hidden overflow-y-auto px-2 pb-2 text-xs break-all whitespace-pre-wrap text-black">
          {(data as { text: string })?.text}
        </p>
      </Show>

      <Handle type="target" position={Position.Bottom} title="Target Edge" className="!size-3 !bg-green-700" />
    </div>
  )
})

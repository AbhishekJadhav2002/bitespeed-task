import type { Node } from '@xyflow/react'
import type { FC } from 'react'
import type { ClassNameValue } from '@/lib/cn'

import { MessageCircleMore, Trash } from 'lucide-react'

import { cn } from '@/lib/cn'
import { Show } from '@/lib/show'

interface INodeCardProps {
  node: Node
  className?: ClassNameValue
  onDeleteNode: (nodeId: string) => void
  onNodeClick: (event: null | React.MouseEvent, node: Node) => void
}

export const NodeCard: FC<INodeCardProps> = props => {
  const { node, className, onNodeClick, onDeleteNode } = props

  return (
    <button
      className={cn(
        'space-y-1 rounded-lg border border-blue-200 bg-blue-50 px-2 py-3 shadow-sm transition-colors hover:border-blue-400',
        className
      )}
      onClick={e => {
        e.stopPropagation()
        onNodeClick(e, node)
      }}
    >
      <div className="flex items-start gap-x-2">
        <MessageCircleMore size={16} className="text-blue-500" />
        <span className="text-xs text-black">ID: {node.id}</span>
        <Trash
          size={16}
          className="ml-auto cursor-pointer text-red-300 transition-colors hover:text-red-700"
          onClick={e => {
            e.stopPropagation()
            onDeleteNode(node.id)
          }}
        />
      </div>
      <Show when={!!(node.data as { text: string })?.text}>
        <span className="flex-1 overflow-hidden text-xs text-wrap whitespace-pre-wrap text-blue-500">
          {(node.data as { text: string })?.text}
        </span>
      </Show>
    </button>
  )
}

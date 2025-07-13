import type { Node } from '@xyflow/react'
import type { FC } from 'react'
import type { ClassNameValue } from '@/lib/cn'

import { MessageCircleMore } from 'lucide-react'

import { NodeCard } from '@/components/organisms/chatbot-flow/components/node-card'

import { cn } from '@/lib/cn'

interface INodesPanelProps {
  nodes: Node[]
  className?: ClassNameValue
  onDeleteNode: (nodeId: string) => void
  onDragStart: (event: React.DragEvent, nodeType: string) => void
  onNodeClick: (event: null | React.MouseEvent, node: Node) => void
}

export const NodesPanel: FC<INodesPanelProps> = props => {
  const { nodes, className, onDragStart, onNodeClick, onDeleteNode } = props

  return (
    <div className={cn('flex w-64 flex-col items-stretch gap-y-3 border-l border-gray-200 bg-white p-4', className)}>
      <h3 className="text-lg font-semibold text-gray-800">Nodes</h3>

      <div
        className="flex cursor-grab flex-col items-center gap-y-2 rounded-lg border border-blue-200 bg-blue-50 p-3 shadow-sm transition-colors hover:bg-blue-100"
        draggable
        onDragStart={event => onDragStart(event, 'textNode')}
      >
        <div className="flex-center h-6 w-6 rounded text-blue-500">
          <MessageCircleMore size={16} />
        </div>
        <span className="text-sm font-medium text-blue-700">Message</span>
      </div>

      <hr className="border-dashed border-blue-800" />

      <div className="no-scrollbar flex flex-1 basis-0 flex-col gap-y-2 overflow-auto">
        {nodes.map(node => (
          <NodeCard key={node.id} node={node} onDeleteNode={onDeleteNode} onNodeClick={onNodeClick} />
        ))}
      </div>
    </div>
  )
}

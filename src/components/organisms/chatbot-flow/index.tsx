'use client'

import type { Connection, Edge, EdgeMouseHandler, Node, NodeChange, OnConnect, ReactFlowInstance } from '@xyflow/react'
import type { FC } from 'react'

import { addEdge, Background, BackgroundVariant, Controls, MiniMap, useEdgesState, useNodesState } from '@xyflow/react'
import { useCallback, useRef, useState } from 'react'

import { Show } from '@/lib/show'

import '@/styles/react-flow.css'

import { toast } from 'sonner'

import { Header } from '@/components/organisms/chatbot-flow/components/header'
import { NodesPanel } from '@/components/organisms/chatbot-flow/components/nodes-panel'
import { SettingsPanel } from '@/components/organisms/chatbot-flow/components/settings-panel'
import { TextNode } from '@/components/organisms/chatbot-flow/components/text-node'

import { dy } from '@/lib/dy'

const ReactFlow = dy(() => import('@xyflow/react').then(m => m.ReactFlow), {
  ssr: false
})

const initialNodes: Node[] = []
const initialEdges: Edge[] = []

// Handle drag start
const onDragStart = (e: React.DragEvent, nodeType: string) => {
  e.dataTransfer.setData('application/reactflow', nodeType)
  e.dataTransfer.effectAllowed = 'move'
}

export const ChatbotFlow: FC = () => {
  const nodeIndex = useRef(0)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<null | ReactFlowInstance<Node, Edge>>(null)

  // Handle node selection
  const onNodeClick = useCallback((_event: null | React.MouseEvent, node: Node) => {
    setSelectedNode(node)
  }, [])

  // Handle pane click (deselect nodes)
  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [])

  // Handle edge connection
  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      // Check if source already has an edge
      const sourceHasEdge = edges.some(edge => edge.source === params.source)

      if (sourceHasEdge) {
        // Remove existing edge from this source
        setEdges(edges => edges.filter(edge => edge.source !== params.source))
      }

      setEdges(eds => addEdge(params, eds))
    },
    [edges, setEdges]
  )

  // Handle edge double click (deletion)
  const onEdgeDoubleClick: EdgeMouseHandler = useCallback(
    (_event, e) => {
      setEdges(eds => eds.filter(_e => _e.id !== e.id))
    },
    [setEdges]
  )

  // Handle drag over
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  // Handle drop
  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      const type = e.dataTransfer.getData('application/reactflow')

      if (type === undefined || !type || !reactFlowBounds) {
        return
      }

      const position = reactFlowInstance?.flowToScreenPosition({
        y: e.clientY - reactFlowBounds.top,
        x: e.clientX - reactFlowBounds.left
      })

      if (!position) {
        toast.error('Invalid position')
        return
      }

      const newNode: Node = {
        type,
        position,
        data: { text: '' },
        id: `${nodeIndex.current + 1}`
      }
      nodeIndex.current += 1

      setNodes(nds => [...nds, ...(Array.isArray(newNode) ? newNode : [newNode])])
    },
    [reactFlowInstance, nodeIndex, setNodes]
  )

  // Handle text change for selected node
  const onTextChange = useCallback(
    (text: string) => {
      if (selectedNode) {
        setNodes(nds =>
          nds.map(node => (node.id === selectedNode.id ? { ...node, data: { ...node.data, text } } : node))
        )
        setSelectedNode(prev => (prev ? { ...prev, data: { ...prev.data, text } } : null))
      }
    },
    [selectedNode, setNodes]
  )

  // Handle node change and update selected node to newly added node
  const _onNodesChange = useCallback(
    (node: NodeChange<Node>[]) => {
      onNodesChange(node)

      if (node[0]?.type === 'dimensions') {
        const addedNodeId = node[0]?.id
        if (addedNodeId) {
          const addedNode = nodes.find(n => n.id === addedNodeId)
          if (addedNode) setSelectedNode(addedNode)
        }
      }
    },
    [onNodesChange, nodes]
  )

  // Handle node delete
  const onDeleteNode = useCallback(
    (nodeId: string) => {
      if (nodeId) {
        setNodes(nds => nds.filter(node => node.id !== nodeId))
        setSelectedNode(prevSelectedNode => (prevSelectedNode?.id === nodeId ? null : prevSelectedNode))
      }
    },
    [setNodes]
  )

  // Handle back button in settings
  const onBack = useCallback(() => {
    setSelectedNode(null)
  }, [])

  // Validate and save flow
  const validateAndSave = useCallback(() => {
    if (nodes.length > 1) {
      // Check for nodes with empty target handles (no incoming edges)
      const nodesWithoutTargets = nodes.filter(node => !edges.some(edge => edge.target === node.id))

      if (nodesWithoutTargets.length > 1) {
        toast.error('Cannot save Flow. Please connect all nodes.')
        return
      }
    }

    toast.success('Flow saved successfully!')
  }, [nodes, edges])

  return (
    <div className="flex flex-1 flex-col bg-gray-50">
      <Header validateAndSave={validateAndSave} />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-center flex-1" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={_onNodesChange}
            onEdgesChange={onEdgesChange}
            onEdgeDoubleClick={onEdgeDoubleClick}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={{
              textNode: props => <TextNode {...props} selected={selectedNode?.id === props.id} />
            }}
            proOptions={{ hideAttribution: true }} // Hide React Flow logo
            colorMode="light"
            autoSave="chatbot-flow"
            attributionPosition="bottom-left"
          >
            <Background variant={BackgroundVariant.Cross} color="#dbeafe" gap={10} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>

        <Show
          when={!!selectedNode}
          fallback={
            <NodesPanel nodes={nodes} onDragStart={onDragStart} onNodeClick={onNodeClick} onDeleteNode={onDeleteNode} />
          }
        >
          <SettingsPanel
            selectedNode={selectedNode as Node<Record<string, string>>}
            onTextChange={onTextChange}
            onBack={onBack}
          />
        </Show>
      </div>
    </div>
  )
}

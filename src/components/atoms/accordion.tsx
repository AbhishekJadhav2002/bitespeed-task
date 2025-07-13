'use client'

import type { FC, ReactElement, ReactNode } from 'react'

import { ChevronDown } from 'lucide-react'
import { createContext, useCallback, useContext, useLayoutEffect, useRef, useState } from 'react'

import { cn } from '@/lib/cn'

interface AccordionContextProps {
  isOpen: boolean
  toggleAccordion: (open?: boolean) => void
}

const AccordionContext = createContext<AccordionContextProps>({
  isOpen: false,
  toggleAccordion: () => {}
})

const useAccordion = () => {
  const ctx = useContext(AccordionContext)

  if (!ctx) {
    throw new Error('useAccordion must be used within an Accordion component')
  }

  return ctx
}

interface AccordionRootProps {
  open?: boolean
  children?: ReactNode
}

interface AccordionComposition {
  Icon: typeof Icon
  Trigger: typeof Trigger
  Content: typeof Content
}

interface TriggerProps {
  children: ((args: { isOpen: boolean; toggleAccordion: () => void }) => ReactElement) | ReactNode
}

interface ContentProps {
  maxH?: number
  className?: string
  children: ((args: { isOpen: boolean; toggleAccordion: () => void }) => ReactElement) | ReactNode
}

interface IconProps {
  rotate?: string
  className?: string
  children?: ReactNode
}

export const Accordion: FC<AccordionRootProps> & AccordionComposition = ({ children, open = false }) => {
  const [isOpen, setIsOpen] = useState(open)

  const toggleAccordion = useCallback((open?: boolean) => {
    if (typeof open === 'boolean') {
      setIsOpen(open)
    } else {
      setIsOpen(prevOpen => !prevOpen)
    }
  }, [])

  return <AccordionContext.Provider value={{ isOpen, toggleAccordion }}>{children}</AccordionContext.Provider>
}

const Trigger: FC<TriggerProps> = ({ children }) => {
  const { isOpen, toggleAccordion } = useAccordion()

  return <>{typeof children === 'function' ? children({ isOpen, toggleAccordion }) : children}</>
}

const Content: FC<ContentProps> = ({ maxH, children, className = '' }) => {
  const { isOpen, toggleAccordion } = useAccordion()
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<number>(0)

  // Measure content height when visibility changes
  useLayoutEffect(() => {
    if (contentRef.current && isOpen) {
      const height = contentRef.current.scrollHeight
      setContentHeight(height)
    }
  }, [isOpen, children])

  return (
    <div
      className={cn('no-scrollbar w-full overflow-auto transition-all duration-300', {
        'opacity-100': isOpen,
        'opacity-75': !isOpen
      })}
      style={{
        maxHeight: isOpen ? (maxH ? `${maxH}px` : `${contentHeight}px`) : '0px'
      }}
    >
      <div ref={contentRef} className={cn('flex flex-col', className)}>
        {typeof children === 'function' ? children({ isOpen, toggleAccordion }) : children}
      </div>
    </div>
  )
}

const Icon: FC<IconProps> = ({ children, className = '', rotate = 'rotate-180' }) => {
  const { isOpen } = useAccordion()

  return (
    <div className={cn('transform-gpu text-white duration-300', { [rotate]: isOpen }, className)}>
      {children ?? <ChevronDown size={16} />}
    </div>
  )
}

// Attach sub-components to Accordion
Accordion.Trigger = Trigger
Accordion.Content = Content
Accordion.Icon = Icon

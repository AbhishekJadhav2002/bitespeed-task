/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react'

import { cn } from '@/lib/cn'

interface RevealOptions {
  open?: boolean
  initialOpen?: boolean
  type?: 'blur' | 'hide'
  onOpenChange?: (open: boolean) => void
}

interface RevealRootProps extends RevealOptions {
  children: React.ReactNode
}

function useReveal({
  type = 'blur',
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen
}: RevealOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen)
  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  return React.useMemo(
    () => ({
      open,
      type,
      setOpen
    }),
    [open, setOpen, type]
  )
}

type ContextType = null | ReturnType<typeof useReveal>

const RevealContext = React.createContext<ContextType>(null)

const useRevealContext = () => {
  const context = React.useContext(RevealContext)
  if (context == null) {
    throw new Error('Reveal components must be wrapped in <Reveal />')
  }
  return context
}

function useMergeRefs<T = any>(refs: Array<React.Ref<T> | React.RefObject<T>>): React.RefCallback<T> {
  return React.useCallback(
    value => {
      for (const ref of refs) {
        if (typeof ref === 'function') {
          ref(value)
        } else if (ref != null) {
          ;(ref as React.RefObject<null | T>).current = value
        }
      }
    },
    [refs]
  )
}

interface RevealComposition {
  Trigger: typeof Trigger
  Content: typeof Content
}

interface RevealTriggerProps {
  asChild?: boolean
}

const Trigger = React.forwardRef<
  HTMLButtonElement,
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> &
    RevealTriggerProps & {
      children: ((q: { isOpen: boolean; toggle: () => void }) => React.ReactNode) | React.ReactNode
    }
>(function RevealTrigger({ children, asChild = false, type = 'button', ...props }, propRef) {
  const context = useRevealContext()
  const childrenRef = (children as any)?.ref
  const ref = useMergeRefs([propRef, childrenRef])

  const handleClick = (e: React.MouseEvent) => {
    if (props.onClick) {
      props.onClick(e as any)
    }
    context.setOpen(!context.open)
  }

  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as { onClick?: (e: any) => void }
    return React.cloneElement(children as any, {
      ref,
      ...props,
      ...childProps,
      onClick: (e: any) => {
        if (typeof childProps.onClick === 'function') childProps.onClick(e)
        context.setOpen(!context.open)
      }
    })
  }

  return (
    <button
      ref={ref}
      type={type}
      data-state={context.open ? 'open' : 'closed'}
      title={context.open ? 'Hide' : 'Reveal'}
      {...props}
      onClick={handleClick}
    >
      {typeof children === 'function'
        ? children({ isOpen: context.open, toggle: () => context.setOpen(!context.open) })
        : children}
    </button>
  )
})

interface RevealContentProps extends React.HTMLProps<HTMLDivElement> {
  blurClassName?: string
  hideClassName?: string
  showClassName?: string
  unblurClassName?: string
}

const Content = React.forwardRef<
  HTMLDivElement,
  Omit<RevealContentProps, 'children'> & {
    children: ((q: { isOpen: boolean; toggle: () => void }) => React.ReactNode) | React.ReactNode
  }
>(function RevealContent(
  {
    children,
    className,
    unblurClassName = '',
    hideClassName = 'hidden',
    blurClassName = 'blur-lg',
    showClassName = 'blur-none',
    ...props
  },
  ref
) {
  const context = useRevealContext()
  const isRevealed = context.open

  const getAppliedStyles = () => {
    if (context.type === 'hide') {
      return isRevealed ? showClassName : hideClassName
    }
    return isRevealed ? unblurClassName : blurClassName
  }

  const appliedClassName = getAppliedStyles()

  return (
    <div ref={ref} className={cn('transition-all', className, appliedClassName)} aria-hidden={!isRevealed} {...props}>
      {typeof children === 'function'
        ? children({ isOpen: context.open, toggle: () => context.setOpen(!context.open) })
        : children}
    </div>
  )
})

export const Reveal: React.FC<RevealRootProps> & RevealComposition = ({ children, ...options }) => {
  const reveal = useReveal(options)
  return <RevealContext.Provider value={reveal}>{children}</RevealContext.Provider>
}

Reveal.Trigger = Trigger
Reveal.Content = Content

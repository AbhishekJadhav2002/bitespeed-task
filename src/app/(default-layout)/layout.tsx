import type { Metadata } from 'next'

import { Suspense } from 'react'

import { Header } from '@/components/molecules/header'

export const metadata: Metadata = {
  title: {
    default: 'BiteSpeed Task',
    template: '%s | BiteSpeed Task'
  }
}

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto">
      <div className="relative flex flex-1 flex-col">
        <Header className="sticky top-0 z-50 bg-white/20 backdrop-blur-2xl" />
        <Suspense>{children}</Suspense>
      </div>
    </div>
  )
}

import type { Metadata, Viewport } from 'next'

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from 'sonner'

import './globals.css'

export const metadata: Metadata = {
  title: 'BiteSpeed Task',
  description: 'BiteSpeed Task'
}

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  width: 'device-width'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="flex h-dvh flex-col antialiased">
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster toastOptions={{ className: '!bg-black !rounded-xs !border-0 !text-sm !p-4 !text-white' }} />
      </body>
    </html>
  )
}

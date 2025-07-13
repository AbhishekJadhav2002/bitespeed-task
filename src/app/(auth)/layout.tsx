import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'BiteSpeed Task',
    template: '%s | BiteSpeed'
  }
}

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}

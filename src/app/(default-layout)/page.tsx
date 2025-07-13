import type { Metadata } from 'next'

import { Suspense } from 'react'

import { ChatbotFlow } from '@/components/organisms/chatbot-flow'

export const metadata: Metadata = {
  title: 'Home'
}

export default function HomePage() {
  return (
    <Suspense>
      <ChatbotFlow />
    </Suspense>
  )
}

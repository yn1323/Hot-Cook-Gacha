'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { NotFound } from '@/component/feature/notifications/NotFound'

export default function RootNotFound() {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.back()
    }, 2500)
  }, [router])
  return (
    <main>
      <NotFound />
    </main>
  )
}

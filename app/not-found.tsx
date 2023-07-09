'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { PageNotFound } from '@/component/feature/error/PageNotFound'

export default function RootNotFound() {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.back()
    }, 2500)
  }, [router])
  return (
    <main>
      <PageNotFound />
    </main>
  )
}

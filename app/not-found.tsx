'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RootNotFound() {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }, [router])
  return <main>404 Error. Redirect to TOP page</main>
}

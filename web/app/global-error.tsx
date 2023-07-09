'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function GlobalError() {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }, [router])
  return <main>Internal Server Error. Redirect to TOP page</main>
}

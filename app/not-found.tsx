'use client'

// import { NotFound } from '@/components/feature/notifications/NotFound'

export default function RootNotFound() {
  // const router = useRouter()
  // useEffect(() => {
  //   setTimeout(() => {
  //     router.back()
  //   }, 2500)
  // }, [router])
  return (
    <main>
      {/* なぜかコンポーネントをimportするとbuildエラーになる */}
      Not Found
      {/* <NotFound /> */}
    </main>
  )
}

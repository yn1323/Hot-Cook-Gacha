import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { ClientCheckLogin } from '@/components/layout/wrapper/CheckLogin/ClientCheckLogin'
import { PostLoginCheck } from '@/page/api/auth/isAuthenticated/route'
import { serverFetch } from '@/src/api/fetch'

// ログインなしで表示するパス
const nonAuthPath = ['/', '/login/register', '/login/forgotPassword']

const accountExistCheck = async () => {
  const userInfo = await serverFetch<PostLoginCheck>(
    '/api/auth/isAuthenticated',
    { method: 'POST' }
  )

  return {
    ...userInfo,
    isDev: !!process.env.NEXT_PUBLIC_IS_LOCAL,
  }
}

type Props = {
  children: ReactNode
}

export const CheckLogin = async ({ children }: Props) => {
  const { isAuthenticated, uid, isDev } = await accountExistCheck()
  const headersList = headers()
  const url = new URL(headersList.get('x-url') ?? '')

  const pathname = url.pathname

  // HMR中は保存ごとのLayoutのローディングが走るためreturnさせる
  if (isDev) {
    return <ClientCheckLogin uid={uid}>{children}</ClientCheckLogin>
  }

  if (isAuthenticated && nonAuthPath.includes(pathname)) {
    return redirect('/dashboard')
  }

  if (!isAuthenticated && !nonAuthPath.includes(pathname)) {
    return redirect('/')
  }

  return <ClientCheckLogin uid={uid}>{children}</ClientCheckLogin>
}

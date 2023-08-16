import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Fragment, ReactNode } from 'react'
import { PostLoginCheck } from '@/page/api/auth/isAuthenticated/route'
import { serverFetch } from '@/src/api/fetch'

// ログインなしで表示するパス
const nonAuthPath = ['/', '/login/register', '/login/forgotPassword']

const accountExistCheck = async () => {
  const { isAuthenticated } = await serverFetch<PostLoginCheck>(
    '/api/auth/isAuthenticated',
    { method: 'POST' }
  )

  return {
    isAuthenticated,
    isDev: !!process.env.NEXT_PUBLIC_IS_LOCAL,
  }
}

type Props = {
  children: ReactNode
}

export const CheckLogin = async ({ children }: Props) => {
  const { isAuthenticated, isDev } = await accountExistCheck()
  const headersList = headers()
  const url = new URL(headersList.get('x-url') ?? '')

  const pathname = url.pathname

  // HMR中は保存ごとのLayoutのローディングが走るためreturnさせる
  if (isDev) {
    return <Fragment>{children}</Fragment>
  }

  if (isAuthenticated && nonAuthPath.includes(pathname)) {
    return redirect('/dashboard')
  }

  if (!isAuthenticated && !nonAuthPath.includes(pathname)) {
    return redirect('/')
  }

  return <Fragment>{children}</Fragment>
}

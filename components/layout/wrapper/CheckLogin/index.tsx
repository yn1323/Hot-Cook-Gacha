'use client'

import { Fragment, ReactNode, useLayoutEffect, useState } from 'react'
import { PageLoading } from '@/components/layout/PageLoading'
import { useSession } from '@/src/hooks/auth/useSession'

// ログインなしで表示するパス
const nonAuthPath = ['/', '/login/register', '/login/forgotPassword']

type Props = {
  children: ReactNode
}

export const CheckLogin = ({ children }: Props) => {
  const [loginState, setLoginState] = useState({
    pathname: '',
  })

  useLayoutEffect(() => {
    if (!loginState.pathname)
      setLoginState({ ...loginState, pathname: window.location.pathname })
  }, [loginState, setLoginState])

  const { loginPending, isLoggedIn } = useSession()

  if (loginPending) {
    return <PageLoading />
  }

  if (isLoggedIn && nonAuthPath.includes(loginState.pathname)) {
    window.location.href = '/dashboard'
    return <PageLoading />
  }

  if (!isLoggedIn && !nonAuthPath.includes(loginState.pathname)) {
    window.location.href = '/'
    return <PageLoading />
  }

  return <Fragment>{children}</Fragment>
}

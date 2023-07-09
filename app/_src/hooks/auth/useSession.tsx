import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { getFirebaseAuth } from '@/firebase/client'
import { useCustomToast } from '@/hooks/ui/useCustomToast'

export const useSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // 単純なログインのリクエスト、レスポンス待ち
  const [loginPending, setLoginPending] = useState(true)
  // ログイン時のリダイレクトでボタン連打防止を防ぐためのローディング
  const [waitForLoginRedirect, setWaitForLoginRedirect] = useState(false)

  const [logoutPending, setLogoutPending] = useState(false)
  const [emailLoginLoading, setEmailLoginLoading] = useState(false)
  const { errorToast, successToast } = useCustomToast()

  const router = useRouter()
  const auth = getFirebaseAuth()
  auth.languageCode = 'ja'

  useLayoutEffect(() => {
    auth.onAuthStateChanged(user => {
      window.sessionStorage.removeItem('pending')
      setLoginPending(false)
      if (user) {
        setIsLoggedIn(true)
        user.getIdToken().then(token => {
          // ログイン画面の場合リダイレクト
          if (window.location.pathname === '/') {
            document.cookie = `token=${token}`
            router.push('/dashboard')
          }
        })
      } else {
        setIsLoggedIn(false)
      }
    })
  }, [auth, router])

  useEffect(() => {
    setWaitForLoginRedirect(
      window.sessionStorage.getItem('pending') === '1' && loginPending
    )
  }, [setWaitForLoginRedirect, loginPending])

  const logout = useCallback(() => {
    setLogoutPending(true)
    document.cookie = 'token=; max-age=0'
    auth
      .signOut()
      .then(() => {
        router.push('/')
        successToast({
          description: 'ログアウトが完了しました。',
        })
      })
      .catch(_ => {
        setLogoutPending(false)
      })
  }, [auth, router, successToast])

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    // リダイレクトしてしまうので、LSでも管理する
    window.sessionStorage.setItem('pending', '1')
    // await signInWithRedirect(auth, provider)
    await signInWithPopup(auth, provider)
  }

  const handleEmailLogin = (email: string, password: string) => {
    window.sessionStorage.setItem('pending', '1')
    setEmailLoginLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.sessionStorage.removeItem('pending')
        router.push('/dashboard')
      })
      .catch(error => {
        console.error(error)
        setEmailLoginLoading(false)
        errorToast({
          title: 'ログインエラー',
          description: 'アカウントが存在しないかパスワードが間違っています。',
        })
      })
  }

  const handleEmailRegister = (email: string, password: string) => {
    setEmailLoginLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        handleEmailLogin(email, password)
      })
      .catch(error => {
        console.error(error)
        setEmailLoginLoading(false)
        errorToast({
          description: 'しばらく経ってから再度お試しください。',
        })
      })
  }

  const handleSendPasswordResetMail = (email: string) => {
    setEmailLoginLoading(true)
    sendPasswordResetEmail(auth, email)
      .then(() => {
        router.push('/')
        successToast({
          description:
            'パスワードリセットのメールを送信しました。メールに記載のURLにアクセスしてください。',
        })
      })
      .catch(error => {
        console.error(error)
        setEmailLoginLoading(false)
        errorToast({ description: 'しばらく経ってから再度お試しください。' })
      })
  }

  return {
    logout,
    logoutPending,
    isLoggedIn,
    handleGoogleLogin,
    handleEmailLogin,
    handleEmailRegister,
    handleSendPasswordResetMail,
    emailLoginLoading,
    waitForLoginRedirect,
  }
}

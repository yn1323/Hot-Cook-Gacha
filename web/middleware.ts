import { NextResponse, type NextRequest } from 'next/server'

// ログインなしで表示するパス
const nonAuthPath = ['/', '/login/register', '/login/forgotPassword']
// middleware対象外とする拡張子
const excludeExtensions = [
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.ico',
  '.js',
]

// 未ログイン判定
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value ?? ''
  const path = new URL(request.nextUrl).pathname

  // 画像とか
  if (excludeExtensions.some(ext => request.nextUrl.pathname.includes(ext))) {
    return NextResponse.next()
  }
  const authNotRequired = nonAuthPath.some(p => path === p)
  if (!token && authNotRequired) {
    return NextResponse.next()
  }
  const res = await fetch(new URL('/api/auth/isAuthenticated', request.url), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
  const json = await res.json()

  const { isAuthenticated } = json
  if (authNotRequired && isAuthenticated) {
    return NextResponse.rewrite(new URL('/dashboard', request.url))
  }
  if (!nonAuthPath.includes(path) && !isAuthenticated) {
    request.cookies.delete('token')
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}

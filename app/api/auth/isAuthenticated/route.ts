import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { checkAuthentication } from '@/services/auth/common'
import { BaseFetch } from '@/src/api/fetch'

export type PostLoginCheck = BaseFetch & {
  response: {
    isAuthenticated: boolean
    uid: string
  }
}

export const POST = async (request: NextRequest) => {
  const token = cookies().get('token')?.value ?? ''

  const user = await checkAuthentication(token)

  return NextResponse.json({
    isAuthenticated: !!user,
    uid: user ? user.uid : '',
  })
}

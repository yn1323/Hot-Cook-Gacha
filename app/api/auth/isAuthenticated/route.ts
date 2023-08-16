import { NextRequest, NextResponse } from 'next/server'
import { checkAuthentication } from '@/services/auth/common'
import { BaseFetch } from '@/src/api/fetch'

export type PostLoginCheck = BaseFetch & {
  response: {
    isAuthenticated: boolean
  }
}

export const POST = async (request: NextRequest) => {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1]
  const isAuthenticated = await checkAuthentication(token)

  return NextResponse.json({ isAuthenticated })
}

import { NextRequest, NextResponse } from 'next/server'
import { checkAuthentication } from '@/services/auth/common'

export const POST = async (request: NextRequest) => {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1]
  const isAuthenticated = await checkAuthentication(token)

  return NextResponse.json({ isAuthenticated })
}

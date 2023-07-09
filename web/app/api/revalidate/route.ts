import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { checkAuthentication } from '@/services/auth/common'

export async function GET(request: NextRequest) {
  const token = cookies().get('token')?.value ?? ''
  const user = await checkAuthentication(token)

  if (!user) return null

  const path = request.nextUrl.searchParams.get('path') || '/'
  revalidatePath(path)
  return NextResponse.json({ revalidated: true })
}

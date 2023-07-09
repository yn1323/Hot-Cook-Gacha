import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { getServerAuth } from '@/firebase/server'
import { GetUser } from '@/page/(auth)/users/[userId]/route'
import { BaseFetch, serverFetch } from '@/page/_src/api'

export type User = {
  name: string
  picture: string
  uid: string
}

export type GetSelf = BaseFetch & {
  response: {
    isAuthenticated: boolean
    isUserExistInDb: boolean
    user?: User
  }
}

export const GET = async (_: NextRequest) => {
  const token = cookies().get('token')?.value ?? ''

  const auth = getServerAuth()
  const user = await auth.verifyIdToken(token).catch(e => console.log(e))

  if (!user) {
    return NextResponse.json({ isAuthenticated: false })
  }

  const firestoreUser = await serverFetch<GetUser>(`/users/${user.uid}`)

  return NextResponse.json({
    isAuthenticated: true,
    isUserExistInDb:
      firestoreUser.user && !!Object.keys(firestoreUser.user).length,
    user:
      firestoreUser.user && Object.keys(firestoreUser.user).length
        ? firestoreUser.user
        : user,
  })
}

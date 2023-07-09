import { NextRequest, NextResponse } from 'next/server'
import { serverCollection } from '@/firebase/server'
import { BaseFetch } from '@/page/_src/api'

type UserDocument = {
  uid: string
  name: string
  picture: string
}

export type GetUser = BaseFetch & {
  response: {
    user:
      | null
      | (UserDocument & {
          dateCreated: Date
          dateUpdate: Date
        })
  }
  requestOptions: {
    query: {
      userId: string
    }
  }
}
export const GET = async (
  _: NextRequest,
  { params: { userId } }: { params: GetUser['requestOptions']['query'] }
) => {
  const res = await serverCollection
    .doc('account')
    .collection('users')
    .doc(userId)
    .get()
    .catch(e => console.log(e))

  if (!res) {
    return { user: null }
  }
  const user = res.data()

  return NextResponse.json({
    user: {
      ...user,
      dateCreated: user && user.dateCreated.toDate(),
      dateUpdate: user && user.dateUpdate.toDate(),
    },
  })
}

export type PostUser = BaseFetch & {
  response: {}
  requestOptions: {
    query: UserDocument
  }
}
export const POST = async (request: NextRequest) => {
  const { uid, name, picture }: PostUser['requestOptions']['query'] =
    await request.json()

  const res = await serverCollection
    .doc('account')
    .collection('users')
    .doc(uid)
    .set({
      uid,
      name,
      picture,
      dateCreated: new Date(),
      dateUpdate: new Date(),
    })

  return NextResponse.json(res)
}

export type UpdateUser = BaseFetch & {
  response: {
    ok: boolean
  }
  requestOptions: {
    query: Partial<Pick<UserDocument, 'picture' | 'name'>>
  }
}
export const PUT = async (
  request: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) => {
  const { name, picture }: UpdateUser['requestOptions']['query'] =
    await request.json()

  const res = await serverCollection
    .doc('account')
    .collection('users')
    .doc(userId)
    .update({
      ...(name ? { name } : {}),
      ...(picture ? { picture } : {}),
      dateUpdate: new Date(),
    })
    .catch(e => console.log(e))

  return NextResponse.json({ ok: !!res })
}

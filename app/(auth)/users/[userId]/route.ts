import { NextRequest, NextResponse } from 'next/server'
import { BaseFetch } from '@/src/api/fetch'
import { serverCollection } from '@/src/firebase/server'

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
          dateCreated: string
          dateUpdated: string
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
      dateUpdated: user && user.dateUpdated.toDate(),
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
      dateUpdated: new Date(),
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
      dateUpdated: new Date(),
    })
    .catch(e => console.log(e))

  return NextResponse.json({ ok: !!res })
}

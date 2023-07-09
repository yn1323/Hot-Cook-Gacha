import { NextRequest, NextResponse } from 'next/server'
import { serverCollection } from '@/firebase/server'
import { BaseFetch } from '@/page/_src/api'

type {{ inputs.component | camel }}Document = {
  uid: string
}

export type Get{{ inputs.component | camel }} = BaseFetch & {
  response: {
    user: {{ inputs.component | camel }}Document & {
      dateCreated: Date
      dateUpdate: Date
    }
  }
  requestOptions: {
    query: {
      userId: string
    }
  }
}
export const GET = async (
  _: NextRequest,
  { params: { userId } }: { params: Get{{ inputs.component | camel }}['requestOptions']['query'] }
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

export type Post{{ inputs.component | camel }} = BaseFetch & {
  response: {}
  requestOptions: {
    query: {{ inputs.component | camel }}Document
  }
}
export const POST = async (request: NextRequest) => {
  const { uid, name, picture }: Post{{ inputs.component | camel }}['requestOptions']['query'] =
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

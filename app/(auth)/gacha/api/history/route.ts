import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { BaseFetch } from '@/src/api/fetch'
import { getServerAuth, serverCollection } from '@/src/firebase/server'

export type GetGachaHistory = BaseFetch & {
  response: {
    gachaHistories: {
      userId: string
      url: string
      dateCreated: string
    }[]
  }
  requestOptions: {}
}
export const GET = async (_: NextRequest) => {
  const token = cookies().get('token')?.value ?? ''
  const auth = getServerAuth()
  const user = await auth.verifyIdToken(token).catch(e => console.log(e))

  if (!user) {
    return NextResponse.json({ gachaHistories: [] })
  }

  const res = await serverCollection
    .doc('search')
    .collection('gachaHistory')
    .where('userId', '==', user.uid)
    .limit(20)
    .get()
    .catch(e => console.log(e))

  if (!res) {
    return NextResponse.json({ gachaHistories: [] })
  }

  const gachaHistories = res.docs
    .map(doc => doc.data())
    .map(all => ({
      ...all,
      dateCreated: all.dateCreated.toDate(),
    }))

  return NextResponse.json({
    gachaHistories: gachaHistories,
  })
}

export type PostGachaHistory = BaseFetch & {
  response: {
    ok: boolean
  }
  requestOptions: {
    query: {
      url: string
    }
  }
}
export const POST = async (request: NextRequest) => {
  const queries: PostGachaHistory['requestOptions']['query'] =
    await request.json()
  const token = cookies().get('token')?.value ?? ''
  const auth = getServerAuth()
  const user = await auth.verifyIdToken(token).catch(e => console.log(e))

  if (!user) {
    return NextResponse.json({ ok: false })
  }

  const res = await serverCollection
    .doc('search')
    .collection('gachaHistory')
    .add({
      url: queries.url,
      userId: user.uid,
      dateCreated: new Date(),
    })
  return NextResponse.json({ ok: !!res })
}

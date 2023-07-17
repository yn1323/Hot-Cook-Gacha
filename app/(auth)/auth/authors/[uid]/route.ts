import { NextRequest, NextResponse } from 'next/server'
import { serverCollection } from '@/firebase/server'
import { BaseFetch } from '@/page/_src/api'

type Author = {
  name: string
  id: string
  picture?: string
}

export type GetAuthor = BaseFetch & {
  response: {
    author: Author
  }
  requestOptions: {
    query: {
      uid: string
    }
  }
}

export const GET = async (
  _: NextRequest,
  { params: { uid } }: { params: { uid: string } }
) => {
  const res = await serverCollection
    .doc('account')
    .collection('users')
    .where('uid', '==', uid)
    .get()
    .catch(e => console.log(e))

  if (!res) {
    return NextResponse.json({ author: [] })
  }

  const authorData = res.docs.map(doc => {
    const d = doc.data()
    return {
      name: d.name,
      id: d.uid,
      picture: d.picture,
    }
  })

  return NextResponse.json({
    author: authorData[0],
  })
}

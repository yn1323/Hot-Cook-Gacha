import { NextRequest, NextResponse } from 'next/server'
import { BaseFetch } from '@/src/api/fetch'
import { serverCollection } from '@/src/firebase/server'

export type Author = {
  name: string
  id: string
}

export type GetAuthors = BaseFetch & {
  response: {
    authors: Author[]
  }
  requestOptions: {
    query: {
      authorIds: string
    }
  }
}

export const GET = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams
  const authors = params.get('authorIds')

  if (!authors) {
    return NextResponse.json({ authors: [] })
  }

  const authorIds = authors.split(',')

  const res = await serverCollection
    .doc('account')
    .collection('users')
    .where('uid', 'in', authorIds)
    .get()
    .catch(e => console.log(e))

  if (!res) {
    return NextResponse.json({ authors: [] })
  }

  const authorData = res.docs.map(doc => {
    const d = doc.data()
    return {
      name: d.name,
      id: d.uid,
    }
  })

  return NextResponse.json({
    authors: authorData,
  })
}

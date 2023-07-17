import console from 'console'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { recipeSchemas } from '@/constants/validations'
import { serverCollection } from '@/firebase/server'
import Recipe from '@/page/(auth)/recipes/[recipeId]/page'
import { BaseFetch } from '@/page/_src/api'

type Comment = {
  author: string
  date: Date
  isDeleted: boolean
  text: string
}

type Recipe = z.infer<typeof recipeSchemas> & {
  recipeId: string
  dateCreated: Date
  dateUpdate: Date
  version: number
  author: string
  comment: Comment[]
  like: number
}

export type GetRecipes = BaseFetch & {
  response: {
    recipes: Recipe[]
  }
  requestOptions: {
    query: {
      limit?: number
      // 1つずるインデックスを貼ること
      oderBy?: 'dateCreated' | 'recipeId'
      // orderByで指定した値の次の開始位置をいれること(DBのoffsetとは違う！)
      startAt?: any
    }
  }
}

export const GET = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams
  const query = {
    limit: parseInt(params.get('limit') || '30'),
    orderBy: params.get('orderBy') || 'recipeId',
    startAt: params.get('startAt') || '',
  }

  const res = await serverCollection
    .doc('search')
    .collection('recipes')
    .where('isPublic', '==', true)
    .orderBy(query.orderBy)
    .limit(query.limit)
    .startAt(query.startAt)
    .get()
    .catch(e => console.log(e))

  if (!res || res.docs.length === 0) {
    return { recipes: [] }
  }
  const recipes = res.docs.map(doc => doc.data())

  return NextResponse.json({
    recipes,
  })
}

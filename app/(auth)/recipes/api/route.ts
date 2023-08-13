import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { MaxRecipeShowPerPage } from '@/constants/recipes'
import { recipeSchemas } from '@/constants/validations'
import { getServerAuth, serverCollection } from '@/firebase/server'
import { BaseFetch } from '@/page/_src/api'

type Comment = {
  author: string
  date: Date
  isDeleted: boolean
  text: string
}

export type RecipeType = z.infer<typeof recipeSchemas> & {
  recipeId: string
  dateCreated: string
  dateUpdated: string
  version: number
  author: string
  comment: Comment[]
  like: number
  random: number
}

export type GetRecipes = BaseFetch & {
  response: {
    recipes: RecipeType[]
  }
  requestOptions: {
    query: {
      limit?: number
      // 1つずるインデックスを貼ること
      oderBy?: 'dateCreated' | 'recipeId'
      // orderByで指定した値の次の開始位置をいれること(DBのoffsetとは違う！)
      startAfter?: any
      endBefore?: any
      endAt?: any
      myRecipeOnly?: boolean
      author?: string
    }
  }
}

export const GET = async (request: NextRequest) => {
  const token = cookies().get('token')?.value ?? ''

  const params = request.nextUrl.searchParams
  const query = {
    limit: parseInt(params.get('limit') || MaxRecipeShowPerPage.toString()),
    orderBy: params.get('orderBy') || 'recipeId',
    startAfter: params.get('startAfter') || '',
    myRecipeOnly: params.get('myRecipeOnly') === 'true',
    author: params.get('author') || '',
  }

  const auth = getServerAuth()
  const user = await auth.verifyIdToken(token).catch(e => console.log(e))

  if (!user) {
    console.error('Recipes auth error')
    return NextResponse.json({ recipes: [] })
  }

  let collection:
    | FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
    | FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = serverCollection
    .doc('search')
    .collection('recipes')

  if (query.myRecipeOnly) {
    const auth = getServerAuth()
    const user = await auth.verifyIdToken(token).catch(e => console.log(e))

    if (!user) {
      return NextResponse.json({ recipes: [] })
    }

    collection = collection
      .where('author', '==', user.uid)
      .orderBy(query.orderBy)
      .limit(query.limit)
  } else if (query.author) {
    collection = collection
      .where('isPublic', '==', true)
      .where('author', '==', query.author)
      .orderBy(query.orderBy)
      .limit(query.limit)
  } else {
    collection = collection
      .where('isPublic', '==', true)
      .orderBy(query.orderBy)
      .limit(query.limit)
  }

  if (query.startAfter) {
    collection = collection.startAfter(query.startAfter)
  }

  const res = await collection.get().catch(e => console.log(e))

  if (!res || res.docs.length === 0) {
    return NextResponse.json({
      recipes: [],
    })
  }
  const recipes = res.docs.map(doc => {
    const data = doc.data()
    return {
      ...data,
      dateCreated: data.dateCreated.toDate(),
      dateUpdated: data.dateUpdate.toDate(),
    }
  })

  return NextResponse.json({
    recipes,
  })
}

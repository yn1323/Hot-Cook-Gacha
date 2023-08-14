import { NextRequest, NextResponse } from 'next/server'
import { serverCollection } from '@/firebase/server'
import { RecipeType } from '@/page/(auth)/recipes/api/route'
import { BaseFetch } from '@/page/_src/api'

export type GetManyRecipes = BaseFetch & {
  response: {
    recipes: RecipeType[]
  }
  requestOptions: {
    query: {
      ids: string
    }
  }
}

export const GET = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams
  const query = {
    ids: params.get('ids') ?? '',
  }
  const ids = query.ids.split(',')

  const res = await serverCollection
    .doc('search')
    .collection('recipes')
    .where('isPublic', '==', true)
    .where('recipeId', 'in', ids)
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

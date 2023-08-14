import { NextRequest, NextResponse } from 'next/server'
import { serverCollection } from '@/firebase/server'
import { RecipeType } from '@/page/(auth)/recipes/api/route'
import { BaseFetch } from '@/page/_src/api'

export type GetNewRecipes = BaseFetch & {
  response: {
    recipes: RecipeType[]
  }
  requestOptions: {}
}

export const GET = async (_: NextRequest) => {
  const res = await serverCollection
    .doc('search')
    .collection('recipes')
    .where('isPublic', '==', true)
    .orderBy('dateCreated', 'desc')
    .limit(5)
    .get()
    .catch(e => console.log(e))

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
      dateUpdated: data.dateUpdated.toDate(),
    }
  })

  return NextResponse.json({
    recipes,
  })
}

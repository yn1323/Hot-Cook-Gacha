import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { recipeSchemas } from '@/constants/validations'
import { getServerAuth, serverCollection } from '@/firebase/server'
import { BaseFetch } from '@/page/_src/api'
import { supabase } from '@/page/_src/supabase/server'

type Comment = {
  author: string
  date: Date
  isDeleted: boolean
  text: string
}

export type GetRecipe = BaseFetch & {
  response: {
    recipe: z.infer<typeof recipeSchemas> & {
      recipeId: string
      dateCreated: Date
      dateUpdate: Date
      version: number
      author: string
      comment: Comment[]
      like: number
    }
  }
  requestOptions: {
    query: {
      recipeId: string
    }
  }
}

export const GET = async (
  _: NextRequest,
  { params: { recipeId } }: { params: GetRecipe['requestOptions']['query'] }
) => {
  const res = await serverCollection
    .doc('search')
    .collection('recipes')
    .where('recipeId', '==', recipeId)
    .where('isPublic', '==', true)
    .limit(1)
    .get()
    .catch(e => console.log(e))

  if (!res || res.docs.length === 0) {
    return { recipe: null }
  }
  const recipe = res.docs[0].data()

  return NextResponse.json({
    recipe: {
      ...recipe,
      dateCreated: recipe.dateCreated.toDate(),
      dateUpdated: recipe.dateUpdate.toDate(),
    },
  })
}

export type PostRecipe = BaseFetch & {
  response: {
    ok: boolean
  }
  requestOptions: {
    query: z.infer<typeof recipeSchemas>
  }
}
export const POST = async (
  request: NextRequest,
  { params: { recipeId } }: { params: { recipeId: string } }
) => {
  const queries: PostRecipe['requestOptions']['query'] = await request.json()

  const token = cookies().get('token')?.value ?? ''

  const auth = getServerAuth()
  const user = await auth.verifyIdToken(token).catch(e => console.log(e))

  if (!user) {
    return NextResponse.json({ ok: false })
  }

  const res = await serverCollection
    .doc('search')
    .collection('recipes')
    .doc(recipeId)
    .set({
      recipeId,
      ...queries,
      dateCreated: new Date(),
      dateUpdate: new Date(),
      version: 1,
      author: user.uid,
      comment: [],
      like: 0,
    })

  try {
    const result = await supabase.from('RECIPE_ID').insert({
      recipeId: recipeId,
      isDeleted: false,
      isPublic: queries.isPublic,
    })
    console.log('result')
    console.log(result)
  } catch (e: any) {
    console.error(e.message)
  }

  return NextResponse.json({ ok: !!res })
}

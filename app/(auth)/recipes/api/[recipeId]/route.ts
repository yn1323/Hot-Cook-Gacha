import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { RecipeType } from '@/page/(auth)/recipes/api/route'
import { BaseFetch } from '@/src/api/fetch'
import { recipeSchemas } from '@/src/constants/validations'
import { getServerAuth, serverCollection } from '@/src/firebase/server'
import { supabase, supabaseEnv } from '../../../../../src/supabase/server'

// TODO: トランザクション

type Comment = {
  author: string
  date: Date
  isDeleted: boolean
  text: string
}

export type GetRecipe = BaseFetch & {
  response: {
    recipe: RecipeType
  }
  requestOptions: {
    query: {}
  }
}

export const GET = async (
  _: NextRequest,
  { params: { recipeId } }: { params: GetRecipe['requestOptions']['query'] }
) => {
  const token = cookies().get('token')?.value ?? ''
  const auth = getServerAuth()
  const user = await auth.verifyIdToken(token).catch(e => console.log(e))

  const res = await serverCollection
    .doc('search')
    .collection('recipes')
    .where('recipeId', '==', recipeId)
    .limit(1)
    .get()
    .catch(e => console.log(e))

  if (!res || res.docs.length === 0) {
    return { recipe: null }
  }
  const recipe = res.docs[0].data()

  if (recipe.isPublic === false && (!user || user.uid !== recipe.author)) {
    return NextResponse.json({
      recipe: null,
    })
  }

  return NextResponse.json({
    recipe: {
      ...recipe,
      dateCreated: recipe.dateCreated.toDate(),
      dateUpdated: recipe.dateUpdated.toDate(),
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
      dateUpdated: new Date(),
      version: 1,
      author: user.uid,
      comment: [],
      like: 0,
      random: Math.random(),
    })

  try {
    const result = await supabase
      .from(`${supabaseEnv.devSupabaseTablePostFix}RECIPE_ID`)
      .insert({
        recipeId: recipeId,
        isDeleted: false,
        isPublic: queries.isPublic,
      })
  } catch (e: any) {
    console.error(e.message)
  }

  return NextResponse.json({ ok: !!res })
}

export type PutRecipe = BaseFetch & {
  response: {
    ok: boolean
  }
  requestOptions: {
    query: z.infer<typeof recipeSchemas>
  }
}

export const PUT = async (
  request: NextRequest,
  { params: { recipeId } }: { params: { recipeId: string } }
) => {
  const queries: PostRecipe['requestOptions']['query'] = await request.json()

  const token = cookies().get('token')?.value ?? ''

  const auth = getServerAuth()
  const user = await auth.verifyIdToken(token).catch(e => console.log(e))

  const prev: any = await serverCollection
    .doc('search')
    .collection('recipes')
    .doc(recipeId)
    .get()
    .catch(e => console.log(e))

  if (!prev) {
    return NextResponse.json({ ok: false })
  }

  const prevRecipe = prev.data()

  if (!prevRecipe || !user || user.uid !== prevRecipe.author) {
    return NextResponse.json({ ok: false })
  }

  const res = await serverCollection
    .doc('search')
    .collection('recipes')
    .doc(recipeId)
    .update({
      ...prevRecipe,
      ...queries,
      dateUpdated: new Date(),
      version: prevRecipe.version + 1,
    })

  try {
    const result = await supabase
      .from(`${supabaseEnv.devSupabaseTablePostFix}RECIPE_ID`)
      .update({
        isPublic: queries.isPublic,
      })
      .eq('recipeId', recipeId)
      .select()
  } catch (e: any) {
    console.error(e.message)
  }

  return NextResponse.json({ ok: !!res })
}

export type DeleteRecipe = BaseFetch & {
  response: {
    ok: boolean
  }
}

export const DELETE = async (
  _: NextRequest,
  { params: { recipeId } }: { params: { recipeId: string } }
) => {
  const token = cookies().get('token')?.value ?? ''

  const auth = getServerAuth()
  const user = await auth.verifyIdToken(token).catch(e => console.log(e))

  const prev: any = await serverCollection
    .doc('search')
    .collection('recipes')
    .doc(recipeId)
    .get()
    .catch(e => console.log(e))

  const prevRecipe = prev.data()

  if (!user || user.uid !== prevRecipe.author) {
    return NextResponse.json({ ok: false })
  }

  const res = await serverCollection
    .doc('search')
    .collection('recipes')
    .doc(recipeId)
    .delete()

  try {
    const result = await supabase
      .from(`${supabaseEnv.devSupabaseTablePostFix}RECIPE_ID`)
      .update({
        isPublic: false,
        isDeleted: true,
      })
      .eq('recipeId', recipeId)
      .select()
  } catch (e: any) {
    console.error(e.message)
  }

  return NextResponse.json({ ok: !!res })
}

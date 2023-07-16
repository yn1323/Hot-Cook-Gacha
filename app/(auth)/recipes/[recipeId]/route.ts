import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { recipeSchemas } from '@/constants/validations'
import { serverCollection } from '@/firebase/server'
import { BaseFetch } from '@/page/_src/api'
import { supabase } from '@/page/_src/supabase/server'

// type recipeDocument = {
//   uid: string
// }

// export type GetRecipe = BaseFetch & {
//   response: {
//     user: recipeDocument & {
//       dateCreated: Date
//       dateUpdate: Date
//     }
//   }
//   requestOptions: {
//     query: {
//       userId: string
//     }
//   }
// }
// export const GET = async (
//   _: NextRequest,
//   { params: { userId } }: { params: GetRecipe['requestOptions']['query'] }
// ) => {
//   const res = await serverCollection
//     .doc('account')
//     .collection('users')
//     .doc(userId)
//     .get()
//     .catch(e => console.log(e))

//   if (!res) {
//     return { user: null }
//   }
//   const user = res.data()

//   return NextResponse.json({
//     user: {
//       ...user,
//       dateCreated: user && user.dateCreated.toDate(),
//       dateUpdate: user && user.dateUpdate.toDate(),
//     },
//   })
// }

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

  const res = await serverCollection
    .doc('search')
    .collection('recipes')
    .doc(recipeId)
    .set({
      recipeId,
      ...queries,
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

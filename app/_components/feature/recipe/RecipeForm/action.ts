'use server'

import { SchemaType } from '@/component/feature/recipe/RecipeForm'
import { serverCollection } from '@/firebase/server'
import { PostRecipe } from '@/page/(auth)/recipes/api/[recipeId]/route'
import { serverFetch } from '@/page/_src/api'

export async function recipePostFormAction(schema: SchemaType) {
  const id = serverCollection.doc().id

  const result = await serverFetch<PostRecipe>(`/recipes/api/${id}`, {
    method: 'POST',
    query: schema,
    cache: 'no-cache',
  })

  if (!result.ok) {
    return false
  }
  return true
}

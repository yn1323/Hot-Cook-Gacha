'use server'

import { revalidateTag } from 'next/cache'
import { SchemaType } from '@/components/feature/recipe/RecipeForm'
import {
  DeleteRecipe,
  PostRecipe,
  PutRecipe,
} from '@/page/(auth)/recipes/api/[recipeId]/route'
import { serverFetch } from '@/src/api/fetch'
import { serverCollection } from '@/src/firebase/server'

function fixedSchema(schema: SchemaType): SchemaType {
  return {
    ...schema,
    preDirections: schema.preDirections.filter(
      ({ direction, image }) => direction || image
    ),
    hotcookDirections:
      schema.hotcookDirections.filter(
        ({ direction, image }) => direction || image
      ).length > 0
        ? schema.hotcookDirections
        : [{ direction: '', image: '' }],
    postDirections: schema.postDirections.filter(
      ({ direction, image }) => direction || image
    ),
  }
}

export async function recipePostFormAction(schema: SchemaType) {
  const id = serverCollection.doc().id

  const result = await serverFetch<PostRecipe>(`/recipes/api/${id}`, {
    method: 'POST',
    query: fixedSchema(schema),
    cache: 'no-cache',
  })

  if (!result.ok) {
    return false
  }
  revalidateTag('recipe')
  return true
}

export async function recipePutFormAction(
  schema: SchemaType,
  recipeId: string
) {
  const result = await serverFetch<PutRecipe>(`/recipes/api/${recipeId}`, {
    method: 'PUT',
    query: fixedSchema(schema),
    cache: 'no-cache',
  })

  if (!result.ok) {
    return false
  }

  revalidateTag('recipe')
  return true
}

export async function recipeDeleteFormAction(recipeId: string) {
  const result = await serverFetch<DeleteRecipe>(`/recipes/api/${recipeId}`, {
    method: 'DELETE',
    cache: 'no-cache',
  })

  if (!result.ok) {
    return false
  }
  revalidateTag('recipe')
  return true
}

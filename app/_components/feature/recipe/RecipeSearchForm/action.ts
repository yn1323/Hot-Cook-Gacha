'use server'

import { GetRecipes } from '@/page/(auth)/recipes/api/route'
import { serverFetch } from '@/page/_src/api'

export type SearchQueryParams = GetRecipes['requestOptions']['query']

export async function recipeSearchFormAction(params: SearchQueryParams) {
  const { recipes } = await serverFetch<GetRecipes>(`/recipes/api`, {
    query: {
      ...params,
    },
  })
  return recipes
}

'use server'

import { GetAuthors } from '@/page/(auth)/auth/authors/route'
import { GetRecipes } from '@/page/(auth)/recipes/api/route'
import { serverFetch } from '@/src/api/fetch'
import { RevalidateTags } from '@/src/api/tags'

export type SearchQueryParams = GetRecipes['requestOptions']['query']

export async function recipeSearchFormAction(params: SearchQueryParams) {
  const { recipes } = await serverFetch<GetRecipes>(`/recipes/api`, {
    query: {
      ...params,
    },
    next: {
      tags: [RevalidateTags.recipe],
    },
  })

  const authorIds = recipes.map(recipe => recipe.author)
  const { authors } = await serverFetch<GetAuthors>(`/auth/authors`, {
    query: {
      authorIds: authorIds.join(','),
    },
  })

  return { recipes, authors }
}

'use server'

import { GetGachaRandom } from '@/page/(auth)/gacha/api/random/route'
import { GetManyRecipes } from '@/page/(auth)/recipes/api/many/route'
import { RecipeType } from '@/page/(auth)/recipes/api/route'
import { serverFetch } from '@/page/_src/api'
import { SchemaType } from '.'

export type SearchQueryParams = {
  ids: string
  term: string
  cookPerDay: string
}

export async function gachaRandomGetFormAction(schema: SchemaType) {
  const {
    gacha: { recipeIds },
  } = await serverFetch<GetGachaRandom>(`/gacha/api/random`, {
    query: {
      term: schema.term,
      cookPerDay: schema.cookPerDay,
    },
    cache: 'no-cache',
    method: 'GET',
  })

  return { recipeIds }
}

export async function getRecipesFromIdsAction(params: SearchQueryParams) {
  if (!params.ids) return { recipes: [] }
  const { recipes } = await serverFetch<GetManyRecipes>(`/recipes/api/many`, {
    query: {
      ...params,
    },
    method: 'GET',
  })

  return {
    recipes: params.ids
      .split(',')
      .map(id =>
        recipes.find(recipe => recipe.recipeId === id)
      ) as RecipeType[],
  }
}

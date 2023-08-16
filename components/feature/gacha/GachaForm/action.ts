'use server'

import { revalidateTag } from 'next/cache'
import { PostGachaHistory } from '@/page/(auth)/gacha/api/history/route'
import { GetGachaRandom } from '@/page/(auth)/gacha/api/random/route'
import { GetManyRecipes } from '@/page/(auth)/recipes/api/many/route'
import { RecipeType } from '@/page/(auth)/recipes/api/route'
import { serverFetch } from '@/src/api/fetch'
import { SchemaType } from '.'

export type SearchQueryParams = {
  ids: string
  term: string
  cookPerDay: string
  noStore?: string
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
  const recipesFetch = serverFetch<GetManyRecipes>(`/recipes/api/many`, {
    query: {
      ...params,
    },
    method: 'GET',
  })

  const historyPost = params.noStore
    ? () => {}
    : serverFetch<PostGachaHistory>(`/gacha/api/history`, {
        query: {
          url: `/gacha?ids=${params.ids}&term=${params.term}&cookPerDay=${params.cookPerDay}`,
        },
        method: 'POST',
      })

  const [{ recipes }] = await Promise.all([recipesFetch, historyPost])

  revalidateTag('gacha')

  return {
    recipes: params.ids
      .split(',')
      .map(id =>
        recipes.find(recipe => recipe.recipeId === id)
      ) as RecipeType[],
  }
}

export async function postGachaUrlAction(url: string) {
  const { ok } = await serverFetch<PostGachaHistory>(`/gacha/api/history`, {
    query: {
      url,
    },
    method: 'POST',
  })

  return !!ok
}

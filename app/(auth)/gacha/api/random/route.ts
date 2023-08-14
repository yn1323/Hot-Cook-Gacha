import { NextRequest, NextResponse } from 'next/server'
import { serverCollection } from '@/firebase/server'
import { GetRecipe } from '@/page/(auth)/recipes/api/[recipeId]/route'
import { BaseFetch } from '@/page/_src/api'

const recipeFetchCollection = async ({
  random,
  reverse,
}: {
  random: number
  reverse?: boolean
}) =>
  await serverCollection
    .doc('search')
    .collection('recipes')
    .where('isPublic', '==', true)
    .where('random', reverse ? '<' : '>', random)
    .limit(1)
    .get()

export type GetGachaRandom = BaseFetch & {
  response: {
    gacha: {
      recipeIds: string[]
    }
  }
  requestOptions: {
    query: {
      term?: string
      cookPerDay?: string
    }
  }
}
export const GET = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams
  const { term, cookPerDay } = {
    term: parseInt(params.get('term') ?? '5'),
    cookPerDay: parseInt(params.get('cookPerDay') ?? '1'),
  }

  const recipesCount = !term || !cookPerDay ? 1 : term * cookPerDay

  const recipesBase = [...Array(recipesCount)].map(_ => ({
    hit: false,
    random: Math.random(),
  }))

  const recipeIds: string[] = []

  await Promise.all(
    recipesBase.map(({ random }) => recipeFetchCollection({ random }))
  ).then(responses => {
    responses.forEach((response, i) => {
      if (response.docs.length === 0) return
      const res = response.docs.map(doc =>
        doc.data()
      )[0] as GetRecipe['response']['recipe']

      recipesBase[i].hit = true
      recipeIds.push(res.recipeId)
    })
  })

  await Promise.all(
    recipesBase
      .filter(({ hit }) => !hit)
      .map(({ random }) => recipeFetchCollection({ random, reverse: true }))
  ).then(responses => {
    responses.forEach((response, i) => {
      const res = response.docs.map(doc =>
        doc.data()
      )[0] as GetRecipe['response']['recipe']

      recipeIds.push(res.recipeId)
    })
  })

  return NextResponse.json({
    gacha: {
      recipeIds,
    },
  })
}

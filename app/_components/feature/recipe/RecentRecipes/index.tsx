import { Fragment } from 'react'
import { Header } from '@/component/feature/recipe/RecentRecipes/Header'
import { ShowMore } from '@/component/feature/recipe/RecentRecipes/ShowMore'
import { RecipeList } from '@/component/feature/recipe/RecipeList'
import { GetNewRecipes } from '@/page/(auth)/recipes/api/new/route'
import { serverFetch } from '@/page/_src/api'

async function initialize() {
  const { recipes } = await serverFetch<GetNewRecipes>(`/recipes/api/new`, {
    next: {
      tags: ['recipe'],
    },
  })

  return {
    recipes,
  }
}

type Props = {}

export const RecentRecipes = async ({}: Props) => {
  const { recipes } = await initialize()

  return (
    <Fragment>
      <Header />
      <RecipeList recipes={recipes} />
      <ShowMore />
    </Fragment>
  )
}

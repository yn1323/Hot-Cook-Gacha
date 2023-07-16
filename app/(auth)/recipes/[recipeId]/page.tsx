import { PageNotFound } from '@/component/feature/notifications/PageNotFound'
import { Animation } from '@/component/layout/Animation'
import { GetRecipe } from '@/page/(auth)/recipes/api/[recipeId]/route'
import { serverFetch } from '@/page/_src/api'

async function initialize(recipeId: string) {
  const { recipe } = await serverFetch<GetRecipe>(`/recipes/api/${recipeId}`)

  return recipe
}

const Recipe = async ({
  params: { recipeId },
}: {
  params: { recipeId: string }
}) => {
  const recipe = await initialize(recipeId)
  if (!recipe) {
    return <PageNotFound />
  }

  return <Animation>Recipe Found!</Animation>
}

export default Recipe

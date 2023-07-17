import { NotFound } from '@/component/feature/notifications/NotFound'
import { RecipeDetail } from '@/component/feature/recipe/RecipeDetail'
import { Animation } from '@/component/layout/Animation'
import { GetAuthor } from '@/page/(auth)/auth/authors/[uid]/route'
import { GetRecipe } from '@/page/(auth)/recipes/api/[recipeId]/route'
import { serverFetch } from '@/page/_src/api'

async function initialize(recipeId: string) {
  const { recipe } = await serverFetch<GetRecipe>(`/recipes/api/${recipeId}`)

  if (!recipe) {
    return null
  }

  const { author } = await serverFetch<GetAuthor>(
    `/auth/authors/${recipe.author ?? ''}`
  )

  return {
    ...recipe,
    authorName: author?.name ?? '',
    authorPicture: author?.picture ?? '',
  }
}

const Recipe = async ({
  params: { recipeId },
}: {
  params: { recipeId: string }
}) => {
  const recipe = await initialize(recipeId)

  if (!recipe) {
    return <NotFound />
  }

  return (
    <Animation>
      <RecipeDetail recipe={recipe} />
    </Animation>
  )
}

export default Recipe

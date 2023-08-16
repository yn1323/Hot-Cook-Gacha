import { NotFound } from '@/components/feature/notifications/NotFound'
import { RecipeDetail } from '@/components/feature/recipe/RecipeDetail'
import { Animation } from '@/components/layout/Animation'
import { GetAuthor } from '@/page/(auth)/auth/authors/[uid]/route'
import { GetRecipe } from '@/page/(auth)/recipes/api/[recipeId]/route'
import { GetUser } from '@/page/(auth)/users/[userId]/route'
import { serverFetch } from '@/src/api/fetch'

async function initialize(recipeId: string) {
  const userFetch = serverFetch<GetUser>('/auth/self')
  const recipeFetch = serverFetch<GetRecipe>(`/recipes/api/${recipeId}`, {
    query: {},
    next: {
      tags: ['recipe'],
    },
  })

  const [{ user }, { recipe }] = await Promise.all([userFetch, recipeFetch])

  if (!recipe) {
    return null
  }

  const { author } = await serverFetch<GetAuthor>(
    `/auth/authors/${recipe.author ?? ''}`
  )

  return {
    ...recipe,
    isEditable: user?.uid === recipe.author,
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
      <RecipeDetail recipe={recipe} isEditable={recipe.isEditable} />
    </Animation>
  )
}

export default Recipe

import { NotFound } from '@/component/feature/notifications/NotFound'
import { RecipeDetail } from '@/component/feature/recipe/RecipeDetail'
import { Animation } from '@/component/layout/Animation'
import { GetAuthor } from '@/page/(auth)/auth/authors/[uid]/route'
import { GetRecipe } from '@/page/(auth)/recipes/api/[recipeId]/route'
import { GetUser } from '@/page/(auth)/users/[userId]/route'
import { serverFetch } from '@/page/_src/api'

async function initialize(recipeId: string) {
  const { user } = await serverFetch<GetUser>('/auth/self')
  const { recipe } = await serverFetch<GetRecipe>(`/recipes/api/${recipeId}`, {
    query: {},
    next: {
      tags: ['recipe'],
    },
  })

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
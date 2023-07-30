import { NotFound } from '@/component/feature/notifications/NotFound'
import { RecipeForm } from '@/component/feature/recipe/RecipeForm'
import {
  recipeDeleteFormAction,
  recipePutFormAction,
} from '@/component/feature/recipe/RecipeForm/action'
import { Animation } from '@/component/layout/Animation'
import { GetAuthor } from '@/page/(auth)/auth/authors/[uid]/route'
import { GetRecipe } from '@/page/(auth)/recipes/api/[recipeId]/route'
import { GetUser } from '@/page/(auth)/users/[userId]/route'
import { serverFetch } from '@/page/_src/api'

async function initialize(recipeId: string) {
  const { user } = await serverFetch<GetUser>('/auth/self')

  if (!user) {
    return null
  }

  const { recipe } = await serverFetch<GetRecipe>(`/recipes/api/${recipeId}`, {
    query: {},
    cache: 'no-cache',
  })

  if (user.uid !== recipe.author) {
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

const RecipeEdit = async ({
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
      <RecipeForm
        defaultValues={recipe}
        onUpdate={recipePutFormAction}
        onDelete={recipeDeleteFormAction}
        recipeId={recipe.recipeId}
        isEdit
      />
    </Animation>
  )
}

export default RecipeEdit

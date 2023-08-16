import { NotFound } from '@/components/feature/notifications/NotFound'
import { RecipeForm } from '@/components/feature/recipe/RecipeForm'
import {
  recipeDeleteFormAction,
  recipePutFormAction,
} from '@/components/feature/recipe/RecipeForm/action'
import { Animation } from '@/components/layout/Animation'
import { GetAuthor } from '@/page/(auth)/auth/authors/[uid]/route'
import { GetRecipe } from '@/page/(auth)/recipes/api/[recipeId]/route'
import { GetUser } from '@/page/(auth)/users/[userId]/route'
import { serverFetch } from '@/src/api/fetch'

async function initialize(recipeId: string) {
  const userFetch = serverFetch<GetUser>('/auth/self')

  const recipeFetch = serverFetch<GetRecipe>(`/recipes/api/${recipeId}`, {
    query: {},
    cache: 'no-cache',
  })

  const [{ user }, { recipe }] = await Promise.all([userFetch, recipeFetch])

  if (!user || user.uid !== recipe.author) {
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

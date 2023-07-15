import { RecipeForm } from '@/component/feature/recipe/RecipeForm'
import { Animation } from '@/component/layout/Animation'
import { GetSelf } from '@/page/(auth)/auth/self/route'
import { serverFetch } from '@/page/_src/api'

async function initialize() {
  const { user } = await serverFetch<GetSelf>('/auth/self')
  if (!user) {
    return { name: '', uid: '', picture: '' }
  }
  return user
}

const Post = async () => {
  const { uid } = await initialize()

  return (
    <Animation>
      <RecipeForm />
    </Animation>
  )
}

export default Post

import { userConfigFormAction } from '@/components/feature/userConfig/UserConfigForm/action'
import { Animation } from '@/components/layout/Animation'
import { Center } from '@/components/layout/Center'
import { GetSelf } from '@/page/(auth)/auth/self/route'
import { Logout } from '@/page/(auth)/mypage/_Logout'
import Recipes from '@/page/(auth)/mypage/Recipes'
import UserConfig from '@/page/(auth)/mypage/UserConfig'
import { GetRecipes } from '@/page/(auth)/recipes/api/route'
import { serverFetch } from '@/src/api/fetch'
import { RevalidateTags } from '@/src/api/tags'

async function initialize() {
  const userFetch = serverFetch<GetSelf>('/auth/self')

  const recipesFetch = serverFetch<GetRecipes>('/recipes/api', {
    query: {
      myRecipeOnly: true,
    },
    next: {
      tags: [RevalidateTags.recipe],
    },
  })

  const [{ user }, { recipes }] = await Promise.all([userFetch, recipesFetch])

  return {
    user: user ?? { name: '', uid: '', picture: '' },
    recipes,
  }
}

const MyPage = async () => {
  const {
    user: { name, picture, uid },
    recipes = [],
  } = await initialize()

  return (
    <Animation>
      <Center divider>
        <UserConfig
          defaultValues={{ name, picture }}
          uid={uid}
          onSubmit={userConfigFormAction}
        />
        <Recipes recipes={recipes} />
        <Logout />
      </Center>
    </Animation>
  )
}

export default MyPage

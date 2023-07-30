import { userConfigFormAction } from '@/component/feature/userConfig/UserConfigForm/action'
import { Animation } from '@/component/layout/Animation'
import { Center } from '@/component/layout/Center'
import { GetSelf } from '@/page/(auth)/auth/self/route'
import Recipes from '@/page/(auth)/mypage/Recipes'
import UserConfig from '@/page/(auth)/mypage/UserConfig'
import { GetRecipes } from '@/page/(auth)/recipes/api/route'
import { serverFetch } from '@/page/_src/api'

async function initialize() {
  const { user } = await serverFetch<GetSelf>('/auth/self')
  if (!user) {
    return { user: { name: '', uid: '', picture: '', recipes: [] } }
  }

  const { recipes } = await serverFetch<GetRecipes>('/recipes/api', {
    query: {
      myRecipeOnly: true,
    },
  })

  return {
    user,
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
      </Center>
    </Animation>
  )
}

export default MyPage

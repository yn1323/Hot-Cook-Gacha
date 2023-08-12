import { GachaForm } from '@/component/feature/gacha/GachaForm'
import {
  SearchQueryParams,
  gachaRandomGetFormAction,
  getRecipesFromIdsAction,
} from '@/component/feature/gacha/GachaForm/action'
import { GachaResult } from '@/component/feature/gacha/GachaResult'
import { Animation } from '@/component/layout/Animation'
import { Center } from '@/component/layout/Center'

const Gacha = async ({ searchParams }: { searchParams: SearchQueryParams }) => {
  const { recipes } = await getRecipesFromIdsAction(searchParams)

  return (
    <Animation>
      <Center>
        <GachaForm onSubmit={gachaRandomGetFormAction} />
        {recipes.length > 0 && (
          <GachaResult
            recipes={recipes}
            onReselect={gachaRandomGetFormAction}
          />
        )}
      </Center>
    </Animation>
  )
}

export default Gacha

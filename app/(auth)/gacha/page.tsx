import { GachaForm } from '@/components/feature/gacha/GachaForm'
import {
  SearchQueryParams,
  gachaRandomGetFormAction,
  getRecipesFromIdsAction,
} from '@/components/feature/gacha/GachaForm/action'
import { GachaResult } from '@/components/feature/gacha/GachaResult'
import { Animation } from '@/components/layout/Animation'
import { Center } from '@/components/layout/Center'

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

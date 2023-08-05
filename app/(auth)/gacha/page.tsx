import { GachaForm } from '@/component/feature/gacha/GachaForm'
import {
  SearchQueryParams,
  gachaRandomGetFormAction,
  getRecipesFromIdsAction,
} from '@/component/feature/gacha/GachaForm/action'
import { Animation } from '@/component/layout/Animation'
import { Center } from '@/component/layout/Center'

const Gacha = async ({ searchParams }: { searchParams: SearchQueryParams }) => {
  const { recipes } = await getRecipesFromIdsAction(searchParams)

  return (
    <Animation>
      <Center divider>
        <GachaForm onSubmit={gachaRandomGetFormAction} />
      </Center>
    </Animation>
  )
}

export default Gacha

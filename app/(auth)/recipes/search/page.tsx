import { NotFound } from '@/component/feature/notifications/NotFound'
import { RecipeSearchForm } from '@/component/feature/recipe/RecipeSearchForm'
import {
  SearchQueryParams,
  recipeSearchFormAction,
} from '@/component/feature/recipe/RecipeSearchForm/action'
import { Animation } from '@/component/layout/Animation'

const Search = async ({ params }: { params: SearchQueryParams }) => {
  const recipes = await recipeSearchFormAction(params)

  if (!recipes) {
    return (
      <Animation>
        <NotFound label="該当するレシピはありません。" />
      </Animation>
    )
  }

  return (
    <Animation>
      <RecipeSearchForm orderParams={params.orderBy} />
    </Animation>
  )
}

export default Search

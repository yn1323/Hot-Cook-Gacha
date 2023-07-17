import { NotFound } from '@/component/feature/notifications/NotFound'
import {
  SearchQueryParams,
  recipeSearchFormAction,
} from '@/component/feature/recipe/RecipeSearchForm/action'
import { Animation } from '@/component/layout/Animation'
import SearchForm from '@/page/(auth)/recipes/search/form'

const Search = async ({
  searchParams,
}: {
  searchParams: SearchQueryParams
}) => {
  const recipes = await recipeSearchFormAction(searchParams)

  if (!recipes) {
    return (
      <Animation>
        <NotFound label="該当するレシピはありません。" />
      </Animation>
    )
  }

  return (
    <Animation>
      <SearchForm authors={[]} recipes={recipes} />
    </Animation>
  )
}

export default Search

import { NotFound } from '@/components/feature/notifications/NotFound'
import {
  SearchQueryParams,
  recipeSearchFormAction,
} from '@/components/feature/recipe/RecipeSearchForm/action'
import { Animation } from '@/components/layout/Animation'
import SearchForm from '@/page/(auth)/recipes/search/form'

const Search = async ({
  searchParams,
}: {
  searchParams: SearchQueryParams
}) => {
  const { recipes, authors } = await recipeSearchFormAction(searchParams)

  if (!recipes) {
    return (
      <Animation>
        <NotFound label="該当するレシピはありません。" />
      </Animation>
    )
  }

  return (
    <Animation>
      <SearchForm authors={authors} recipes={recipes} />
    </Animation>
  )
}

export default Search

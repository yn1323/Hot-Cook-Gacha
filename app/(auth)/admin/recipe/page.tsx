import { ScrapeForm } from '@/components/feature/scrape/ScrapeForm'
import {
  countRestRecipe,
  getPendingRecipe,
  registerRecipeFormAction,
  skipRecipeAction,
} from '@/components/feature/scrape/ScrapeForm/action'
import { Animation } from '@/components/layout/Animation'

async function initialize() {
  const { restCount } = await countRestRecipe()
  const { recipe, options } = await getPendingRecipe()

  return { restCount, recipe, options }
}

const Scrape = async () => {
  if (!process.env.NEXT_PUBLIC_IS_LOCAL) return null

  const { restCount, recipe, options } = await initialize()

  return (
    <Animation>
      <ScrapeForm
        onRegister={registerRecipeFormAction}
        onSkip={skipRecipeAction}
        restCount={restCount}
        recipe={recipe}
        url={options?.url ?? ''}
        recipeId={options?.recipeId ?? ''}
      />
    </Animation>
  )
}

export default Scrape

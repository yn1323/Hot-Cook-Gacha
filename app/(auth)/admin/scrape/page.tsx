import { ScrapeForm } from '@/components/feature/scrape/ScrapeForm'
import {
  countRestRecipe,
  getPendingRecipe,
  registerRecipeFormAction,
} from '@/components/feature/scrape/ScrapeForm/action'
import { Animation } from '@/components/layout/Animation'

async function initialize() {
  const { restCount } = await countRestRecipe()
  const { recipe } = await getPendingRecipe()
  return { restCount, recipe }
}

const Scrape = async () => {
  const { restCount, recipe } = await initialize()
  if (!process.env.NEXT_PUBLIC_IS_LOCAL) return null

  return (
    <Animation>
      <span>ホットクックを自動でスクレイピングします</span>
      <ScrapeForm
        onRegister={registerRecipeFormAction}
        restCount={restCount}
        recipe={recipe}
      />
    </Animation>
  )
}

export default Scrape

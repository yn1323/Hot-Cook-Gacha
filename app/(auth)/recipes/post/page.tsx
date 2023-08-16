import { RecipeForm } from '@/components/feature/recipe/RecipeForm'
import { recipePostFormAction } from '@/components/feature/recipe/RecipeForm/action'
import { Animation } from '@/components/layout/Animation'

const Post = () => {
  return (
    <Animation>
      <RecipeForm onCreate={recipePostFormAction} />
    </Animation>
  )
}

export default Post

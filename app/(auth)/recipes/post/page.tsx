import { RecipeForm } from '@/component/feature/recipe/RecipeForm'
import { recipePostFormAction } from '@/component/feature/recipe/RecipeForm/action'
import { Animation } from '@/component/layout/Animation'

const Post = () => {
  return (
    <Animation>
      <RecipeForm onCreate={recipePostFormAction} />
    </Animation>
  )
}

export default Post

import { RecipeType } from '@/page/(auth)/recipes/api/route'
import { UnitOptions } from '@/src/constants/recipes'

export const addIngredients = (ingredients: RecipeType['ingredients']) => {
  const copyIngredients = [...ingredients]
  copyIngredients.sort((a, b) => a.ingredient.localeCompare(b.ingredient))

  type IngredientsByName = {
    name: string
    amounts: string[]
  }
  const ingredientsByName = copyIngredients.reduce<IngredientsByName[]>(
    (acc, cur) => {
      if (acc.find(item => item.name === cur.ingredient)) {
        return acc
      }

      const { ingredient: name } = cur
      const all = copyIngredients.filter(
        ({ ingredient }) => ingredient === name
      )

      const amounts: string[] = []

      UnitOptions.forEach(({ value, label }) => {
        const amount = all
          .filter(v => v.unit === value)
          .reduce((acc, cur) => acc + parseFloat(cur.amount), 0)

        if (amount > 0) {
          amounts.push(`${amount} ${label === '単位なし' ? '' : label}`)
        }
      })

      return [...acc, { name, amounts }]
    },
    []
  )

  return ingredientsByName
}

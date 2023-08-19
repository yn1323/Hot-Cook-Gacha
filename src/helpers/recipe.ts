import { RecipeType } from '@/page/(auth)/recipes/api/route'
import { UnitOptions } from '@/src/constants/recipes'
import { isNumber } from '@/src/helpers/string'

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

      // 数値のものは足し合わせる
      UnitOptions.forEach(({ value, label }) => {
        const amount = all
          .filter(v => v.unit === value && isNumber(v.amount))
          .reduce((acc, cur) => acc + parseFloat(cur.amount), 0)

        if (amount > 0) {
          amounts.push(`${amount} ${label === '単位なし' ? '' : label}`)
        }
      })

      // 数値以外はそのまま表示
      all
        .filter(v => !isNumber(v.amount))
        .forEach(v => {
          const label =
            UnitOptions.find(({ value }) => value === v.unit)?.label ?? ''
          amounts.push(`${v.amount} ${label === '単位なし' ? '' : label}`)
        })

      return [...acc, { name, amounts }]
    },
    []
  )

  return ingredientsByName
}

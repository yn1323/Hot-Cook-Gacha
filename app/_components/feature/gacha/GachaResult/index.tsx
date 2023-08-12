'use client'

import { Divider, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useTransition } from 'react'
import { GrRefresh } from 'react-icons/gr'
import { gachaRandomGetFormAction } from '@/component/feature/gacha/GachaForm/action'
import { RecipeList } from '@/component/feature/recipe/RecipeList'
import { RecipeType } from '@/page/(auth)/recipes/api/route'

const GridItemHeight = 32

type Props = {
  recipes: RecipeType[]
  onReselect?: typeof gachaRandomGetFormAction
}

export const GachaResult = ({ recipes, onReselect }: Props) => {
  const searchParams = useSearchParams()
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const { term, cookPerDay } = {
    term: parseInt(searchParams.get('term') ?? '0'),
    cookPerDay: parseInt(searchParams.get('cookPerDay') ?? '0'),
  }

  const dailyRecipes = useMemo(
    () =>
      Array.from({ length: term }, (_, i) =>
        recipes.slice(i * cookPerDay, (i + 1) * cookPerDay)
      ),
    [cookPerDay, recipes, term]
  )

  const handleReselect = (dateIndex: number) => {
    startTransition(async () => {
      if (!onReselect) return
      const { recipeIds } = await onReselect({
        cookPerDay: cookPerDay.toString(),
        term: '1',
      })

      const newRecipeIds = dailyRecipes.reduce<string[]>(
        (acc, dailyRecipe, i) => {
          if (i !== dateIndex) {
            return [...acc, ...dailyRecipe.map(recipe => recipe.recipeId)]
          } else {
            return [...acc, ...recipeIds]
          }
        },
        []
      )

      router.push(
        `/gacha?ids=${newRecipeIds}&term=${term}&cookPerDay=${cookPerDay}`,
        { scroll: false }
      )
    })
  }

  return (
    <VStack divider={<Divider />} w="100%">
      {dailyRecipes.map((recipes, i) => (
        <VStack key={i} w="100%">
          <HStack justifyContent="space-between" w="100%" px={2}>
            <Text fontSize="lg" as="b">
              {i + 1}日目
            </Text>
            <IconButton
              isLoading={pending}
              onClick={() => handleReselect(i)}
              aria-label="再抽選する"
              colorScheme="green"
              icon={<GrRefresh />}
              variant="outline"
            />
          </HStack>
          <VStack w="100%">
            <RecipeList recipes={recipes} hideAuthor />
          </VStack>
        </VStack>
      ))}
    </VStack>
  )
}

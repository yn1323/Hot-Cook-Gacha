'use client'

import { Box, Divider, HStack, Text, VStack } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { RecipeType } from '@/page/(auth)/recipes/api/route'

const GridItemHeight = 32

type Props = {
  recipes: RecipeType[]
}

export const GachaResult = ({ recipes }: Props) => {
  const recipesa = [...recipes, ...recipes, ...recipes, ...recipes, ...recipes]
  const searchParams = useSearchParams()
  const { term, cookPerDay } = {
    term: parseInt(searchParams.get('term') ?? '5'),
    cookPerDay: parseInt(searchParams.get('cookPerDay') ?? '2'),
  }

  const dailyRecipes = Array.from({ length: term }, (_, i) =>
    recipesa.slice(i * cookPerDay, (i + 1) * cookPerDay)
  )

  return (
    <VStack divider={<Divider />}>
      {dailyRecipes.map((recipes, i) => (
        <VStack key={i}>
          <Text>{i + 1}日目</Text>
          <HStack>
            {recipes.map((recipe, j) => (
              <Box key={j}>{recipe.title}</Box>
            ))}
          </HStack>
        </VStack>
      ))}
    </VStack>
  )
}

'use client'

import { Text, VStack } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { ComponentProps } from 'react'
import { RecipeList } from '@/components/feature/recipe/RecipeList'

type Props = Pick<ComponentProps<typeof RecipeList>, 'recipes'>

const Recipes = ({ recipes }: Props) => {
  const params = useSearchParams()

  return (
    <VStack gap={8} w="100%">
      <Text fontSize="2xl">投稿レシピ</Text>
      <RecipeList hideAuthor recipes={recipes} />
    </VStack>
  )
}

export default Recipes

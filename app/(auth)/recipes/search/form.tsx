'use client'

import { VStack } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { ComponentProps } from 'react'
import { RecipeList } from '@/components/feature/recipe/RecipeList'
import { RecipeSearchForm } from '@/components/feature/recipe/RecipeSearchForm'

type Props = Pick<ComponentProps<typeof RecipeList>, 'authors' | 'recipes'>

const SearchForm = ({ authors, recipes }: Props) => {
  const params = useSearchParams()

  return (
    <VStack gap={8}>
      <RecipeSearchForm />
      <RecipeList authors={authors} recipes={recipes} />
    </VStack>
  )
}

export default SearchForm

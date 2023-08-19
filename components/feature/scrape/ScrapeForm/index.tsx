'use client'

import { HStack, Text, VStack } from '@chakra-ui/react'
import { useTransition } from 'react'
import { registerRecipeFormAction } from '@/components/feature/scrape/ScrapeForm/action'
import { useSession } from '@/src/hooks/auth/useSession'

type Props = {
  onRegister?: typeof registerRecipeFormAction
  /** 残りの転機レシピ数 */
  restCount: number
  recipe: any
}

export const ScrapeForm = ({ onRegister, restCount, recipe }: Props) => {
  const [isPending, startTransition] = useTransition()

  const { uid } = useSession()

  console.log(recipe)

  const handleRegister = () => {
    startTransition(async () => {
      if (!onRegister) return
      const result = await onRegister({} as any)
      console.log(result)
    })
  }

  return (
    <VStack>
      <Text>残り{restCount}件</Text>
      <HStack w="100%"></HStack>
    </VStack>
  )
}

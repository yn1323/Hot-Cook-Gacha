'use client'

import { Button, HStack, Link, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { ComponentProps, useTransition } from 'react'
import { RecipeForm } from '@/components/feature/recipe/RecipeForm'
import {
  AdminPostSchema,
  registerRecipeFormAction,
  skipRecipeAction,
} from '@/components/feature/scrape/ScrapeForm/action'
import { useSession } from '@/src/hooks/auth/useSession'
import { useCustomToast } from '@/src/hooks/ui/useCustomToast'

type Props = {
  onRegister?: typeof registerRecipeFormAction
  onSkip?: typeof skipRecipeAction
  /** 残りの転記レシピ数 */
  restCount: number
  recipe: ComponentProps<typeof RecipeForm>['defaultValues']
  url: string
  recipeId: string
}

export const ScrapeForm = ({
  onRegister,
  onSkip,
  restCount,
  recipe,
  url,
  recipeId,
}: Props) => {
  const [isPending, startTransition] = useTransition()
  const { errorToast, successToast } = useCustomToast()
  const router = useRouter()

  const { uid } = useSession()

  const handleRegister = (data: AdminPostSchema) => {
    startTransition(async () => {
      if (!onRegister) return
      const { ok } = await onRegister(data, { uid, recipeId })
      if (!ok) {
        errorToast({ description: '登録に失敗しました。' })
      } else {
        successToast({ description: '登録に成功しました。' })
        router.replace('/admin/recipe', { scroll: true })
        router.refresh()
      }
    })
  }

  const handleSkip = () => {
    startTransition(async () => {
      if (!onSkip) return
      await skipRecipeAction(recipeId)
      router.refresh()
    })
  }

  return (
    <VStack>
      <HStack gap={12}>
        <Text>残り{restCount}件</Text>

        <Link href={url} target="_blank" rel="noopener">
          オリジナルのページを開く
        </Link>

        <Button onClick={handleSkip} colorScheme="green" isLoading={isPending}>
          ヘルシオデリはスキップ！
        </Button>
      </HStack>

      <HStack w="100%">
        <RecipeForm
          // 再レンダリングを強制する
          key={recipeId}
          defaultValues={recipe}
          onAdminCreate={data => handleRegister(data)}
          isLoading={isPending}
        />
      </HStack>
    </VStack>
  )
}

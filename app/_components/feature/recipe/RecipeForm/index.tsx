'use client'

import { VStack } from '@chakra-ui/layout'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  StackDivider,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { DescriptionInput } from '@/component/form/Recipe/DescriptionInput'
import { DirectionsInput } from '@/component/form/Recipe/DirectionsInput'
import { GenreSelect } from '@/component/form/Recipe/GenreSelect'
import { ImageInput } from '@/component/form/Recipe/ImageInput'
import { IngredientsInput } from '@/component/form/Recipe/IngredientsInput'
import { PrepTimeSelect } from '@/component/form/Recipe/PrepTimeSelect'
import { RecipeTypeSelect } from '@/component/form/Recipe/RecipeTypeSelect'
import { ServingSelect } from '@/component/form/Recipe/ServingSelect'
import { StatusInput } from '@/component/form/Recipe/StatusInput'
import { Tag } from '@/component/form/Recipe/Tag'
import { TitleInput } from '@/component/form/Recipe/TitleInput'
import { recipeSchemas } from '@/constants/validations'
import { useCustomToast } from '@/hooks/ui/useCustomToast'

const Schema = recipeSchemas
export type SchemaType = z.infer<typeof Schema>

type Props = {
  defaultValues?: SchemaType
  isEdit?: boolean
  onSubmit: (data: SchemaType) => Promise<boolean>
}

export const RecipeForm = ({ defaultValues, isEdit, onSubmit }: Props) => {
  const { errorToast } = useCustomToast()
  const [isPending, startTransition] = useTransition()
  const methods = useForm<SchemaType>({
    ...(defaultValues
      ? { defaultValues }
      : {
          defaultValues: {
            isPublic: true,
            // 要素追加でフォーカスが外れ、スクロールされた状態になるのを防ぐ
            postDirections: [
              {
                direction: '',
                image: '',
              },
            ],
          },
        }),
    resolver: zodResolver(Schema),
  })
  const router = useRouter()

  const submitHandler = (data: SchemaType) => {
    startTransition(async () => {
      const result = await onSubmit(data)
      if (result) {
        router.push('/recipes/complete')
      } else {
        errorToast({
          title: 'レシピの投稿に失敗しました。',
        })
      }
    })
  }

  return (
    <VStack w="100%" gap={4}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitHandler)}>
          <VStack w="100%" spacing={6}>
            <Card w="100%">
              <CardHeader fontSize="2xl">1. 基本情報</CardHeader>
              <CardBody>
                <VStack w="100%" spacing={6} divider={<StackDivider />}>
                  <TitleInput required />
                  <DescriptionInput />
                  <ImageInput label="料理の写真" url="" />
                  <GenreSelect required />
                  <RecipeTypeSelect required />
                  <PrepTimeSelect required />
                </VStack>
              </CardBody>
            </Card>

            <Card w="100%">
              <CardHeader fontSize="2xl">2. 材料</CardHeader>
              <CardBody>
                <VStack w="100%" spacing={6} divider={<StackDivider />}>
                  <ServingSelect required />
                  <IngredientsInput required />
                </VStack>
              </CardBody>
            </Card>

            <Card w="100%">
              <CardHeader fontSize="2xl">3. 手順</CardHeader>
              <CardBody>
                <VStack w="100%" spacing={6} divider={<StackDivider />}>
                  <DirectionsInput
                    name="preDirections"
                    label="準備・下ごしらえ"
                  />
                  <DirectionsInput
                    name="hotcookDirections"
                    label="ホットクック操作"
                  />
                  <DirectionsInput name="postDirections" label="仕上げ" />
                </VStack>
              </CardBody>
            </Card>

            <Card w="100%">
              <CardHeader fontSize="2xl">4. 公開情報</CardHeader>
              <CardBody>
                <VStack w="100%" spacing={6} divider={<StackDivider />}>
                  <StatusInput />
                  <Tag />
                </VStack>
              </CardBody>
            </Card>
          </VStack>

          <Box textAlign="right" w="100%" mt={6}>
            <Button
              colorScheme="green"
              size="lg"
              type="submit"
              isLoading={isPending}
            >
              {isEdit ? 'レシピを更新する' : 'レシピを投稿する'}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </VStack>
  )
}

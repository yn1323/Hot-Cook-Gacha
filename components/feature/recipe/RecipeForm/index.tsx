'use client'

import { VStack } from '@chakra-ui/layout'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Spacer,
  StackDivider,
  useDisclosure,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  recipeDeleteFormAction,
  recipePostFormAction,
  recipePutFormAction,
} from '@/components/feature/recipe/RecipeForm/action'
import { DeleteModal } from '@/components/feature/recipe/RecipeForm/DeleteModal'
import { DescriptionInput } from '@/components/form/Recipe/DescriptionInput'
import { DirectionsInput } from '@/components/form/Recipe/DirectionsInput'
import { GenreSelect } from '@/components/form/Recipe/GenreSelect'
import { ImageInput } from '@/components/form/Recipe/ImageInput'
import { IngredientsInput } from '@/components/form/Recipe/IngredientsInput'
import { PrepTimeSelect } from '@/components/form/Recipe/PrepTimeSelect'
import { RecipeTypeSelect } from '@/components/form/Recipe/RecipeTypeSelect'
import { ServingSelect } from '@/components/form/Recipe/ServingSelect'
import { StatusInput } from '@/components/form/Recipe/StatusInput'
import { Tag } from '@/components/form/Recipe/Tag'
import { TitleInput } from '@/components/form/Recipe/TitleInput'
import { recipeSchemas } from '@/src/constants/validations'
import { useCustomToast } from '@/src/hooks/ui/useCustomToast'

const Schema = recipeSchemas
export type SchemaType = z.infer<typeof Schema>

type Props = {
  defaultValues?: SchemaType
  isEdit?: boolean
  recipeId?: string
  onCreate?: typeof recipePostFormAction
  onUpdate?: typeof recipePutFormAction
  onDelete?: typeof recipeDeleteFormAction
  onAdminCreate?: (data: SchemaType) => void
}

export const RecipeForm = ({
  defaultValues,
  isEdit,
  recipeId,
  onCreate,
  onUpdate,
  onDelete,
  onAdminCreate,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { errorToast, successToast } = useCustomToast()
  const [isPending, startTransition] = useTransition()
  const methods = useForm<SchemaType>({
    ...(defaultValues
      ? {
          defaultValues: {
            ...defaultValues,
            postDirections: [
              ...(defaultValues.postDirections ?? {
                direction: '',
                image: '',
              }),
            ],
          },
        }
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

  const handleAdminCreate = async (data: SchemaType) => {
    const result = onAdminCreate && onAdminCreate(data)
    if (result) {
      successToast({
        title: 'レシピの投稿が完了しました。',
      })
      router.push(`/admin/recipe`)
    } else {
      errorToast({
        title: 'レシピの投稿に失敗しました。',
      })
    }
  }

  const handleUpdate = async (data: SchemaType) => {
    const result = onUpdate && (await onUpdate(data, recipeId ?? ''))
    if (result) {
      successToast({
        title: 'レシピの更新が完了しました。',
      })
      router.push(`/recipes/${recipeId}`)
    } else {
      errorToast({
        title: 'レシピの更新に失敗しました。',
      })
    }
  }

  const handleCreate = async (data: SchemaType) => {
    const result = onCreate && onCreate(data)
    if (result) {
      router.push('/recipes/complete')
    } else {
      errorToast({
        title: 'レシピの投稿に失敗しました。',
      })
    }
  }

  const submitHandler = (data: SchemaType) => {
    startTransition(async () => {
      if (isEdit) {
        await handleUpdate(data)
      } else if (onAdminCreate) {
        await handleAdminCreate(data)
      } else {
        await handleCreate(data)
      }
    })
  }

  const deleteHandler = () => {
    if (!onDelete) return
    startTransition(async () => {
      const result = await onDelete(recipeId ?? '')
      if (result) {
        successToast({
          title: 'レシピの削除が完了しました。',
        })
        router.push(`/recipes/search`)
      } else {
        errorToast({
          title: 'レシピの削除に失敗しました。',
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

          <HStack justifyContent="space-between" w="100%" mt={6}>
            {isEdit ? (
              <Button
                colorScheme="orange"
                size="lg"
                type="button"
                isLoading={isPending}
                onClick={() => onOpen()}
              >
                レシピを削除する
              </Button>
            ) : (
              <Spacer />
            )}

            <Button
              colorScheme="green"
              size="lg"
              type="submit"
              isLoading={isPending}
            >
              {isEdit
                ? 'レシピを更新する'
                : onAdminCreate
                ? 'レシピを投稿して次へ'
                : 'レシピを投稿する'}
            </Button>
          </HStack>
        </form>
      </FormProvider>
      {isEdit && onDelete && (
        <DeleteModal
          isOpen={isOpen}
          onClose={onClose}
          recipeId={recipeId ?? ''}
          onDelete={deleteHandler}
          isLoading={isPending}
        />
      )}
    </VStack>
  )
}

'use client'

import { VStack } from '@chakra-ui/layout'
import { Card, CardBody, CardHeader, StackDivider } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
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

const Schema = recipeSchemas
type SchemaType = z.infer<typeof Schema>

type Props = {
  defaultValues?: SchemaType
}

export const RecipeForm = ({ defaultValues }: Props) => {
  const methods = useForm<SchemaType>({
    ...(defaultValues ? { defaultValues } : {}),
    resolver: zodResolver(Schema),
  })

  return (
    <FormProvider {...methods}>
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
              <DirectionsInput name="preDirections" label="準備・下ごしらえ" />
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
    </FormProvider>
  )
}

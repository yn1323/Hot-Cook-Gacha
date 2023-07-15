'use client'

import { Divider, VStack } from '@chakra-ui/layout'
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

type Props = {}

export const RecipeForm = ({}: Props) => {
  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
  })

  return (
    <FormProvider {...methods}>
      <VStack w="100%" spacing={6}>
        <TitleInput required />
        <DescriptionInput />
        <ImageInput label="料理の写真" url="" />
        <Divider />
        <GenreSelect required />
        <RecipeTypeSelect required />
        <PrepTimeSelect required />
        <ServingSelect required />
        <IngredientsInput required />
        <Tag />
        <DirectionsInput name="preDirections" />
        <DirectionsInput name="hotcookDirections" />
        <DirectionsInput name="postDirections" />
        <StatusInput />
      </VStack>
    </FormProvider>
  )
}

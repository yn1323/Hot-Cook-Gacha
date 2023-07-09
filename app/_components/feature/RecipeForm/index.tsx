'use client'

import { VStack } from '@chakra-ui/layout'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { DescriptionInput } from '@/component/form/Recipe/DescriptionInput'
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
        <TitleInput />
        <DescriptionInput />
      </VStack>
    </FormProvider>
  )
}

function isRequired(key: keyof typeof recipeSchemas.shape) {
  return 'coerce' in recipeSchemas.shape[key]._def
}

const formContents = [
  { label: 'レシピ名', name: 'title', component: <div>レシピ名</div> },
  { label: '紹介文', name: 'description', component: <div>紹介文</div> },
  { label: '写真', name: 'image', component: <div>写真</div> },
  { label: 'ジャンル', name: 'genre', component: <div>ジャンル</div> },
  { label: '料理種類', name: 'type', component: <div>料理種類</div> },
  { label: 'タグ', name: 'tag', component: <div>タグ</div> },
  { label: '目安時間', name: 'prepTime', component: <div>目安時間</div> },
  { label: '分量', name: 'servings', component: <div>分量</div> },
  { label: '材料', name: 'ingredients', component: <div>材料</div> },
  { label: '準備', name: 'preDirections', component: <div>準備</div> },
  {
    label: 'ホットクックの操作',
    name: 'hotcookDirections',
    component: <div>ホットクックの操作</div>,
  },
  { label: '仕上げ', name: 'postDirections', component: <div>仕上げ</div> },
  { label: '公開・非公開', name: 'status', component: <div>公開、非公開</div> },
]

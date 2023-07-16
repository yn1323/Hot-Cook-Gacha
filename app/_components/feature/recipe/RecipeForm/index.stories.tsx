import { type Meta, type StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { RecipeForm } from '.'

const meta = {
  title: 'feature/recipe/RecipeForm',
  component: RecipeForm,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof RecipeForm>
export default meta

export const Basic: StoryObj<typeof meta> = {}

export const Edit: StoryObj<typeof meta> = {
  args: {
    defaultValues: {
      title: 'タイトル',
      description: '説明',
      image: '',
      genre: 'japanese',
      type: 'noodle',
      servings: '2',
      prepTime: 10,
      ingredients: [
        {
          amount: '1',
          ingredient: '材料1',
          unit: 'ko',
          mark: 'circle',
          prep: 'いちょうぎり',
        },
        {
          amount: '2',
          ingredient: '材料2',
          unit: 'ml',
          mark: '',
        },
      ],
      preDirections: [
        {
          direction: '準備・下ごしらえ1',
          image: '',
        },
        {
          direction: '準備・下ごしらえ2',
          image: '',
        },
      ],
      hotcookDirections: [
        {
          direction: 'ボタンを押す',
          image: '',
        },
      ],
      postDirections: [],
      status: 'public',
      tags: ['朝食', 'ランチ', '簡単'],
    },
  },
}

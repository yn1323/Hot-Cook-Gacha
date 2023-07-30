import { type Meta, type StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { RecipeDetail } from '.'

const meta = {
  title: 'feature/recipe/RecipeDetail',
  component: RecipeDetail,
  args: {
    recipe: {
      image: '',
      like: 0,
      author: 'knosWyHDtOVbWNTFPhHsb6zd8ts1',
      description: '説明文',
      title: '２こめ',
      type: 'soup',
      preDirections: [{ image: '', direction: '下準備1' }],
      postDirections: [{ image: '', direction: '' }],
      version: 1,
      recipeId: 'G9a6SZVClfwBeo3MkK1v',
      prepTime: 30,
      tags: ['初心者'],
      servings: '2',
      dateCreated: '2023-07-17T03:01:32.797Z',
      dateUpdate: '2023-07-17T03:01:32.797Z',
      genre: 'japanese',
      ingredients: [
        {
          amount: '11',
          unit: '',
          ingredient: '1',
          prep: '222',
          mark: '',
        },
        {
          amount: '11',
          unit: '',
          ingredient: '1',
          prep: '222',
          mark: '',
        },
        {
          amount: '11',
          unit: '',
          ingredient: '1',
          prep: '222',
          mark: '',
        },
      ],
      isPublic: true,
      comment: [],
      hotcookDirections: [{ image: '', direction: '333' }],
      authorName: '名前',
      authorPicture: '',
    },
  },
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof RecipeDetail>
export default meta

export const Basic: StoryObj<typeof meta> = {}

export const Editable: StoryObj<typeof meta> = {
  args: {
    isEditable: true,
  },
}

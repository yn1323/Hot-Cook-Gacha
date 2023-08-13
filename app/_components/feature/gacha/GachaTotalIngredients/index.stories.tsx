import { type Meta, type StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { GachaTotalIngredients } from '.'

const meta = {
  title: 'feature/gacha/GachaTotalIngredients',
  component: GachaTotalIngredients,
  args: {
    term: 5,
    recipes: [
      {
        image: '',
        like: 0,
        author: 'knosWyHDtOVbWNTFPhHsb6zd8ts1',
        description: '',
        title: '1こめ',
        type: 'soup',
        preDirections: [{ image: '', direction: '' }],
        postDirections: [{ image: '', direction: '' }],
        version: 1,
        recipeId: 'G9a6SZVClfwBeo3MkK1v',
        prepTime: 30,
        tags: ['初心者'],
        servings: '2',
        dateCreated: '2023-08-05T08:20:09.325Z',
        dateUpdated: '2023-08-05T08:20:09.325Z',
        genre: 'japanese',
        ingredients: [
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
        random: 0.5,
      },
      {
        image: '',
        like: 0,
        author: 'knosWyHDtOVbWNTFPhHsb6zd8ts1',
        description: '',
        title: '２こめ',
        type: 'soup',
        preDirections: [{ image: '', direction: '' }],
        postDirections: [{ image: '', direction: '' }],
        version: 1,
        recipeId: 'G9a6SZVClfwBeo3MkK1v',
        prepTime: 30,
        tags: ['初心者'],
        servings: '2',
        dateCreated: '2023-08-05T08:20:09.325Z',
        dateUpdated: '2023-08-05T08:20:09.325Z',
        genre: 'japanese',
        ingredients: [
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
        random: 0.5,
      },
    ],
  },
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof GachaTotalIngredients>
export default meta

export const Basic: StoryObj<typeof meta> = {}

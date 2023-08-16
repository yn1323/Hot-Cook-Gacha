import { type Meta, type StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { RecipeThumbnail } from '.'

const meta = {
  title: 'feature/recipe/RecipeThumbnail',
  component: RecipeThumbnail,
  args: {
    thumbnails: [
      { image: '', recipeId: '' },
      { image: '', recipeId: '' },
      { image: '', recipeId: '' },
    ],
    isLoading: false,
  },
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof RecipeThumbnail>
export default meta

export const Basic: StoryObj<typeof meta> = {}

export const Loading: StoryObj<typeof meta> = {
  args: {
    isLoading: true,
  },
}

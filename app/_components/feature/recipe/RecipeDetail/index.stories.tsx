import { type Meta, type StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { RecipeDetail } from '.'

const meta = {
  title: 'feature/recipe/RecipeDetail',
  component: RecipeDetail,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof RecipeDetail>
export default meta

export const Basic: StoryObj<typeof meta> = {}

import { type Meta, type StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { RecipeSearchForm } from '.'

const meta = {
  title: 'feature/recipe/RecipeSearchForm',
  component: RecipeSearchForm,
  args: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof RecipeSearchForm>
export default meta

export const Basic: StoryObj<typeof meta> = {}

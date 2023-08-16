import { type Meta, type StoryObj } from '@storybook/react'
import { ShowMore } from '.'

const meta = {
  title: 'feature/recipe/RecentRecipes/ShowMore',
  component: ShowMore,
  args: {},
  parameters: {},
} satisfies Meta<typeof ShowMore>
export default meta

export const Basic: StoryObj<typeof meta> = {}

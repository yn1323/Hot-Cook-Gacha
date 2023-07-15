import { type Meta, type StoryObj } from '@storybook/react'
import { RequiredBadge } from '.'

const meta = {
  title: 'form/Recipe/RequiredBadge',
  component: RequiredBadge,
  args: {},
  parameters: {},
} satisfies Meta<typeof RequiredBadge>
export default meta

export const Basic: StoryObj<typeof meta> = {}

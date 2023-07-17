import { type Meta, type StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { NotFound } from '.'

const meta = {
  title: 'feature/error/NotFound',
  component: NotFound,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof NotFound>
export default meta

export const Basic: StoryObj<typeof meta> = {}

import { type Meta, type StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { Complete } from '.'

const meta = {
  title: 'feature/notifications/Complete',
  component: Complete,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof Complete>
export default meta

export const Basic: StoryObj<typeof meta> = {}

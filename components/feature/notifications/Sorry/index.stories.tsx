import { type Meta, type StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { Sorry } from '.'

const meta = {
  title: 'feature/error/Sorry',
  component: Sorry,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof Sorry>
export default meta

export const Basic: StoryObj<typeof meta> = {}

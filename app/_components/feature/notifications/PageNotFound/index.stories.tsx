import { type Meta, type StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { PageNotFound } from '.'

const meta = {
  title: 'feature/error/PageNotFound',
  component: PageNotFound,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof PageNotFound>
export default meta

export const Basic: StoryObj<typeof meta> = {}

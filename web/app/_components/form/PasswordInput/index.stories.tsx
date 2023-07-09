import type { Meta, StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { PasswordInput } from '.'

const meta = {
  title: 'form/PasswordInput',
  component: PasswordInput,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof PasswordInput>
export default meta

export const Basic: StoryObj<typeof meta> = {}

import { type Meta, type StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { UserNameInput } from '.'

const meta = {
  title: 'form/UserNameInput',
  component: UserNameInput,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof UserNameInput>
export default meta

export const Basic: StoryObj<typeof meta> = {}

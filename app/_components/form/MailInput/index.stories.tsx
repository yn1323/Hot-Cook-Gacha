import type { Meta, StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { MailInput } from '.'

const meta = {
  title: 'form/MailInput',
  component: MailInput,
  args: {
    disabled: false,
  },
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof MailInput>
export default meta

export const Basic: StoryObj<typeof meta> = {}

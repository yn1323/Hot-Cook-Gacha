import type { Meta, StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { DescriptionInput } from '.'

const meta = {
  title: 'form/recipe/DescriptionInput',
  component: DescriptionInput,
  args: {
    disabled: false,
  },
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof DescriptionInput>
export default meta

export const Basic: StoryObj<typeof meta> = {}

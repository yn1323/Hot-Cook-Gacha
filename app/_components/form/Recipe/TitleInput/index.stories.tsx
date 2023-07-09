import type { Meta, StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { TitleInput } from '.'

const meta = {
  title: 'form/recipe/TitleInput',
  component: TitleInput,
  args: {
    disabled: false,
  },
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof TitleInput>
export default meta

export const Basic: StoryObj<typeof meta> = {}

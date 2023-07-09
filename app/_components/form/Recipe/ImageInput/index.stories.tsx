import { type Meta, type StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { ImageInput } from '.'

const meta = {
  title: 'form/recipe/ImageInput',
  component: ImageInput,
  args: {
    url: '',
    label: '料理の写真',
  },
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof ImageInput>
export default meta

export const Basic: StoryObj<typeof meta> = {}

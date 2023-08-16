import { type Meta, type StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { GachaForm } from '.'

const meta = {
  title: 'feature/gacha/GachaForm',
  component: GachaForm,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof GachaForm>
export default meta

export const Basic: StoryObj<typeof meta> = {}

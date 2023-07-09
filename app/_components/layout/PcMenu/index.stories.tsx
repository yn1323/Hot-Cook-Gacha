import type { Meta, StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { PcMenu } from '.'

const meta = {
  title: 'layout/PcMenu',
  component: PcMenu,
  args: {
    children: <div>children</div>,
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof PcMenu>
export default meta

export const Basic: StoryObj<typeof meta> = {}

import type { Meta, StoryObj } from '@storybook/react'
import { CenterBox } from '.'

const meta = {
  title: 'layout/CenterBox',
  component: CenterBox,
  args: {
    children: <div>Child Component</div>,
  },
} satisfies Meta<typeof CenterBox>
export default meta

export const Basic: StoryObj<typeof meta> = {}

import { type Meta, type StoryObj } from '@storybook/react'
import { Header } from '.'

const meta = {
  title: 'feature/gacha/RecentGachaHistory/Header',
  component: Header,
  args: {},
  parameters: {},
} satisfies Meta<typeof Header>
export default meta

export const Basic: StoryObj<typeof meta> = {}

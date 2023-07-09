import type { Meta, StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import Page from './page'

const meta = {
  title: 'pages/home',
  component: Page,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof Page>
export default meta

export const Basic: StoryObj<typeof meta> = {}

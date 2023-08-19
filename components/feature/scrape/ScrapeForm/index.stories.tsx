import { type Meta, type StoryObj } from '@storybook/react'
import { FormProviderDecorator } from '@/config/Decorators'
import { ScrapeForm } from '.'

const meta = {
  title: 'feature/scrape/ScrapeForm',
  component: ScrapeForm,
  args: {},
  parameters: {},
  decorators: [FormProviderDecorator],
} satisfies Meta<typeof ScrapeForm>
export default meta

export const Basic: StoryObj<typeof meta> = {}

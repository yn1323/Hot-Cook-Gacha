import type { Preview } from '@storybook/react'
import { initialize, mswDecorator } from 'msw-storybook-addon'

initialize()

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    chromatic: { viewports: [414, 1080] },
  },
  decorators: [mswDecorator],
}

export default preview

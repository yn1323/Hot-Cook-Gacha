import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../app/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chakra-ui/storybook-addon',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  refs: {
    '@chakra-ui/react': {
      disable: true,
    },
  },
  staticDirs: ['../public'],
  webpackFinal: async config => {
    if (!config.resolve) {
      return config
    }
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/component': path.resolve(__dirname, '../app/_components'),
      '@/page': path.resolve(__dirname, '../app/_pages'),
      '@/config': path.resolve(__dirname, '../app/_configs'),
      '@/hooks': path.resolve(__dirname, '../app/_src/hooks'),
      '@/constants': path.resolve(__dirname, '../app/_src/constants'),
      '@/helpers': path.resolve(__dirname, '../app/_src/helpers'),
      '@/services': path.resolve(__dirname, '../app/_services'),
      '@/firebase': path.resolve(__dirname, '../app/_src/firebase'),
    }
    return config
  },
  env: config => ({
    ...config,
    EXAMPLE_VAR: 'An environment variable configured in Storybook',
  }),
}
export default config

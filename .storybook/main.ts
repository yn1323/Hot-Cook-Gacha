import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'

const config: StorybookConfig = {
  stories: [
    '../app/**/*.stories.@(js|jsx|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
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
      '@/components': path.resolve(__dirname, '../components'),
      '@/config': path.resolve(__dirname, '../configs'),
      '@/src': path.resolve(__dirname, '../src'),
      '@/services': path.resolve(__dirname, '../services'),
      '@/page': path.resolve(__dirname, '../app'),
    }
    return config
  },
  env: config => ({
    ...config,
    EXAMPLE_VAR: 'An environment variable configured in Storybook',
  }),
}
export default config
